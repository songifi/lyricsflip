import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useContract } from '../../hooks/useContract';
import { useBackend } from '../../hooks/useBackend';
import { useToast } from '../../hooks/useToast';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Spinner } from '../atoms/Spinner';
import { Badge } from '../atoms/Badge';
import { Modal } from '../molecules/Modal';
import { Tabs, TabPanel } from '../molecules/Tabs';

export interface BackendSong {
  id: string;
  title: string;
  artist: string;
  year?: number;
  status: 'draft' | 'pending' | 'approved' | 'synced' | 'disabled';
  onChainCardId?: number | null;
  activeRoundId?: string | null;
}

interface CardFormValues {
  title: string;
  artist: string;
  year: string;
}

type TabKey = 'curation' | 'browser';

const EMPTY_FORM: CardFormValues = { title: '', artist: '', year: '' };

export const AdminCards: React.FC = () => {
  const { contract, addCards, updateCard, disableCard } = useContract();
  const { backend } = useBackend();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<TabKey>('curation');

  // Curation queue state
  const [pendingSongs, setPendingSongs] = useState<BackendSong[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loadingQueue, setLoadingQueue] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  // Card browser state
  const [allSongs, setAllSongs] = useState<BackendSong[]>([]);
  const [loadingBrowser, setLoadingBrowser] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [editingSong, setEditingSong] = useState<BackendSong | null>(null);
  const [formValues, setFormValues] = useState<CardFormValues>(EMPTY_FORM);
  const [savingEdit, setSavingEdit] = useState<boolean>(false);
  const [disablingId, setDisablingId] = useState<string | null>(null);
  const [confirmDisableSong, setConfirmDisableSong] = useState<BackendSong | null>(null);

  const loadQueue = useCallback(async () => {
    if (!backend) return;
    setLoadingQueue(true);
    try {
      const songs = await backend.getSongs({ status: 'pending' });
      setPendingSongs(songs ?? []);
      setSelectedIds(new Set());
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to load curation queue.',
      });
    } finally {
      setLoadingQueue(false);
    }
  }, [backend, showToast]);

  const loadBrowser = useCallback(async () => {
    if (!backend) return;
    setLoadingBrowser(true);
    try {
      const songs = await backend.getSongs({});
      setAllSongs(songs ?? []);
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to load cards.',
      });
    } finally {
      setLoadingBrowser(false);
    }
  }, [backend, showToast]);

  useEffect(() => {
    if (activeTab === 'curation') {
      void loadQueue();
    } else {
      void loadBrowser();
    }
  }, [activeTab, loadQueue, loadBrowser]);

  const toggleSelected = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (prev.size === pendingSongs.length) {
        return new Set();
      }
      return new Set(pendingSongs.map((s) => s.id));
    });
  };

  const handleApprove = async () => {
    if (!backend || selectedIds.size === 0) return;
    setApproving(true);
    try {
      const ids = Array.from(selectedIds);
      await backend.approveSongs(ids);
      showToast({
        type: 'success',
        message: `Approved ${ids.length} song${ids.length === 1 ? '' : 's'}.`,
      });
      await loadQueue();
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to approve songs.',
      });
    } finally {
      setApproving(false);
    }
  };

  const handleSync = async () => {
    if (!backend || !contract || selectedIds.size === 0) return;
    setSyncing(true);
    try {
      const ids = Array.from(selectedIds);
      const songsToSync = pendingSongs.filter((s) => ids.includes(s.id));

      // Batch add_cards in a single transaction.
      const cardPayloads = songsToSync.map((song) => ({
        title: song.title,
        artist: song.artist,
        year: song.year ?? 0,
      }));

      const result = await addCards(cardPayloads);
      const onChainIds: number[] = result?.cardIds ?? [];

      // Persist on-chain ids back to the backend.
      await backend.markSongsSynced(
        songsToSync.map((song, index) => ({
          id: song.id,
          onChainCardId: onChainIds[index] ?? null,
        })),
      );

      showToast({
        type: 'success',
        message: `Synced ${songsToSync.length} card${
          songsToSync.length === 1 ? '' : 's'
        } on-chain.`,
      });
      await loadQueue();
    } catch (err) {
      showToast({
        type: 'error',
        message: 'Failed to sync cards on-chain.',
      });
    } finally {
      setSyncing(false);
    }
  };

  const filteredSongs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allSongs;
    return allSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term),
    );
  }, [allSongs, search]);

  const openEdit = (song: BackendSong) => {
    setEditingSong(song);
    setFormValues({
      title: song.title,
      artist: song.artist,
      year: song.year != null ? String(song.year) : '',
    });
  };

  const closeEdit = () => {
    setEditingSong(null);
    setFormValues(EMPTY_FORM);
  };

  const handleSaveEdit = async () => {
    if (!backend || !editingSong) return;
    setSavingEdit(true);
    try {
      const year = formValues.year.trim() ? Number(formValues.year) : undefined;
      await backend.updateSong(editingSong.id, {
        title: formValues.title.trim(),
        artist: formValues.artist.trim(),
        year,
      });

      // If the card already exists on-chain, keep it in sync.
      if (editingSong.onChainCardId != null && updateCard) {
        await updateCard(editingSong.onChainCardId, {
          title: formValues.title.trim(),
          artist: formValues.artist.trim(),
          year: year ?? 0,
        });
      }

      showToast({ type: 'success', message: 'Card updated.' });
      closeEdit();
      await loadBrowser();
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to update card.' });
    } finally {
      setSavingEdit(false);
    }
  };

  const requestDisable = (song: BackendSong) => {
    setConfirmDisableSong(song);
  };

  const handleConfirmDisable = async () => {
    if (!backend || !confirmDisableSong) return;
    const song = confirmDisableSong;
    setDisablingId(song.id);
    try {
      if (song.onChainCardId != null && disableCard) {
        await disableCard(song.onChainCardId);
      }
      await backend.disableSong(song.id);
      showToast({ type: 'success', message: 'Card disabled.' });
      setConfirmDisableSong(null);
      await loadBrowser();
    } catch (err) {
      showToast({ type: 'error', message: 'Failed to disable card.' });
    } finally {
      setDisablingId(null);
    }
  };

  const renderSyncStatus = (song: BackendSong) => {
    if (song.onChainCardId != null) {
      return (
        <Badge variant="success">On-chain #{song.onChainCardId}</Badge>
      );
    }
    if (song.status === 'disabled') {
      return <Badge variant="default">Disabled</Badge>;
    }
    return <Badge variant="warning">Not synced</Badge>;
  };

  const allSelected =
    pendingSongs.length > 0 && selectedIds.size === pendingSongs.length;

  return (
    <div className="admin-cards">
      <header className="admin-cards__header">
        <h2>Card Management</h2>
      </header>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as TabKey)}
        tabs={[
          { key: 'curation', label: 'Curation queue' },
          { key: 'browser', label: 'Card browser' },
        ]}
      />

      <TabPanel activeKey={activeTab} tabKey="curation">
        <div className="admin-cards__toolbar">
          <label className="admin-cards__select-all">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              disabled={pendingSongs.length === 0 || loadingQueue}
            />
            Select all
          </label>
          <div className="admin-cards__actions">
            <Button
              variant="secondary"
              onClick={handleApprove}
              disabled={selectedIds.size === 0 || approving || syncing}
            >
              {approving ? <Spinner size="sm" /> : null}
              Approve ({selectedIds.size})
            </Button>
            <Button
              variant="primary"
              onClick={handleSync}
              disabled={selectedIds.size === 0 || syncing || approving}
            >
              {syncing ? <Spinner size="sm" /> : null}
              Sync on-chain ({selectedIds.size})
            </Button>
          </div>
        </div>

        {loadingQueue ? (
          <div className="admin-cards__loading">
            <Spinner />
          </div>
        ) : pendingSongs.length === 0 ? (
          <p className="admin-cards__empty">
            No songs pending approval.
          </p>
        ) : (
          <table className="admin-cards__table">
            <thead>
              <tr>
                <th />
                <th>Title</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Status</th>
                <th>Sync</th>
              </tr>
            </thead>
            <tbody>
              {pendingSongs.map((song) => (
                <tr key={song.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(song.id)}
                      onChange={() => toggleSelected(song.id)}
                    />
                  </td>
                  <td>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>{song.year ?? '—'}</td>
                  <td>
                    <Badge variant="info">{song.status}</Badge>
                  </td>
                  <td>{renderSyncStatus(song)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TabPanel>

      <TabPanel activeKey={activeTab} tabKey="browser">
        <div className="admin-cards__toolbar">
          <Input
            type="search"
            placeholder="Search by title or artist…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search cards"
          />
        </div>

        {loadingBrowser ? (
          <div className="admin-cards__loading">
            <Spinner />
          </div>
        ) : filteredSongs.length === 0 ? (
          <p className="admin-cards__empty">No cards found.</p>
        ) : (
          <table className="admin-cards__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Artist</th>
                <th>Year</th>
                <th>Status</th>
                <th>Sync</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSongs.map((song) => {
                const usedByActiveRound = song.activeRoundId != null;
                return (
                  <tr key={song.id}>
                    <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td>{song.year ?? '—'}</td>
                    <td>
                      <Badge
                        variant={
                          song.status === 'disabled' ? 'default' : 'info'
                        }
                      >
                        {song.status}
                      </Badge>
                      {usedByActiveRound && (
                        <Badge variant="warning">
                          In active round
                        </Badge>
                      )}
                    </td>
                    <td>{renderSyncStatus(song)}</td>
                    <td className="admin-cards__row-actions">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(song)}
                        disabled={song.status === 'disabled'}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => requestDisable(song)}
                        disabled={
                          song.status === 'disabled' ||
                          disablingId === song.id
                        }
                      >
                        {disablingId === song.id ? (
                          <Spinner size="sm" />
                        ) : (
                          'Disable'
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </TabPanel>

      {editingSong && (
        <Modal
          title="Edit card"
          onClose={closeEdit}
          footer={
            <>
              <Button variant="ghost" onClick={closeEdit} disabled={savingEdit}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveEdit}
                disabled={savingEdit}
              >
                {savingEdit ? <Spinner size="sm" /> : null}
                Save
              </Button>
            </>
          }
        >
          <div className="admin-cards__form">
            <label>
              Title
              <Input
                value={formValues.title}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Artist
              <Input
                value={formValues.artist}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    artist: e.target.value,
                  }))
                }
              />
            </label>
            <label>
              Year
              <Input
                type="number"
                value={formValues.year}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
              />
            </label>
          </div>
        </Modal>
      )}

      {confirmDisableSong && (
        <Modal
          title="Disable card"
          onClose={() => setConfirmDisableSong(null)}
          footer={
            <>
              <Button
                variant="ghost"
                onClick={() => setConfirmDisableSong(null)}
                disabled={disablingId === confirmDisableSong.id}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDisable}
                disabled={disablingId === confirmDisableSong.id}
              >
                {disablingId === confirmDisableSong.id ? (
                  <Spinner size="sm" />
                ) : null}
                Disable
              </Button>
            </>
          }
        >
          <p>
            Are you sure you want to disable{' '}
            <strong>{confirmDisableSong.title}</strong> by{' '}
            <strong>{confirmDisableSong.artist}</strong>?
          </p>
          {confirmDisableSong.activeRoundId != null && (
            <p className="admin-cards__warning" role="alert">
              ⚠️ This card is currently used by an active round. Disabling it
              may break that round.
            </p>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AdminCards;