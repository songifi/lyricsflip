# Incident Runbook (LF-250)

Operational procedures for responding to incidents on LyricsFlip. Keep this
runbook current; rehearse it on testnet before mainnet launch.

## Severity

- **SEV1** — funds at risk, contract compromised, or total outage.
- **SEV2** — degraded service (stuck rounds, high error rate, indexer lag).
- **SEV3** — minor issues with a workaround.

## 1. Pausing the contracts

1. Confirm the incident and severity; page the on-call owner.
2. Using the owner multisig/hardware wallet, invoke the contract pause entrypoint.
3. Verify the paused state blocks state-changing calls (submit_answer, round
   finalization, escrow withdrawals).
4. Record the pause timestamp and reason in the incident channel.
5. Do **not** resume until the root cause is understood and fixed.

## 2. Rolling back the frontend

1. Identify the last known-good deployment (tag or commit).
2. Redeploy the previous build via the hosting provider's rollback.
3. Verify critical flows (connect wallet, view rounds, submit answer) against the
   rolled-back build.
4. Announce the rollback in the incident channel and status page.

## 3. Communicating with users

1. Post an initial status update within 15 minutes of a SEV1/SEV2.
2. State what is affected, what users should do (e.g. do not submit answers),
   and when the next update will come.
3. Provide updates at least every 30 minutes until resolved.
4. After resolution, publish a short post-incident summary.

## 4. Post-incident

- File follow-up issues for root cause and prevention.
- Update this runbook and the monitoring alerts if gaps were found.
