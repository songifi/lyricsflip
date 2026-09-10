import { Copy, Lightbulb, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useStellar } from '@/lib/stellar/hooks/useStellar';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ChallengeInvite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { systemCalls } = useStellar();
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roundData, setRoundData] = useState<any>(null);

  const roundId = searchParams.get('roundId');
  const inviteCode = roundId || '';

  useEffect(() => {
    const fetchRoundData = async () => {
      if (!roundId || !systemCalls) return;

      try {
        setIsLoading(true);
        const data = await systemCalls.getRound(BigInt(roundId));
        setRoundData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch round data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoundData();
  }, [roundId, systemCalls]);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(inviteCode)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleClose = () => {
    router.back();
  };

  const handleShareInvite = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Join my challenge!',
          text: `Join my challenge using this code: ${inviteCode}`,
          url: window.location.href,
        })
        .catch((err) => console.log('Error sharing:', err));
    } else {
      handleCopyCode();
      alert('Invite code copied to clipboard!');
    }
  };

  const handleStartChallenge = async () => {
    if (!roundId || !systemCalls) return;

    try {
      setIsLoading(true);
      await systemCalls.startRound(BigInt(roundId));
      router.push(`/multiplayer/game?roundId=${roundId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start challenge');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async () => {
    if (!systemCalls) {
      setError('System calls not initialized');
      return;
    }

    if (!roundId) return;

    try {
      const data = await systemCalls.getRound(BigInt(roundId));
      // ... rest of the code
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get round data');
    }
  };

  const handleStart = async () => {
    if (!systemCalls) {
      setError('System calls not initialized');
      return;
    }

    if (!roundId) return;

    try {
      await systemCalls.startRound(BigInt(roundId));
      // ... rest of the code
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start round');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-auto bg-black/10 flex justify-end p-10">
        <div className="w-full max-w-[580px] min-h-[960px] h-full bg-white rounded-[16px] border-[1.5px] border-[#DBE2E8] p-[32px] flex items-center justify-center">
          <p className="text-[24px] font-[600]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-auto bg-black/10 flex justify-end p-10">
        <div className="w-full max-w-[580px] min-h-[960px] h-full bg-white rounded-[16px] border-[1.5px] border-[#DBE2E8] p-[32px] flex items-center justify-center">
          <p className="text-[24px] font-[600] text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Mock challenge data - in a real app, this would come from props or state
  const challengeData = {
    gameMode: 'Wager (Multi Player)',
    participants: 4,
    wagerAmount: 6,
    wagerValue: '10,000 STRK (100 USD)',
    potentialWin: '80,000 STRK (800 USD)',
  };

  return (
    <div className="w-full h-auto bg-black/10 flex justify-end p-10">
      <div className="w-full max-w-[580px] min-h-[960px] h-full bg-white rounded-[16px] border-[1.5px] border-[#DBE2E8] p-[32px]">
        <div className="flex justify-end">
          <p
            className="hover:cursor-pointer w-fit p-1 border border-[#DBE1E7] rounded-full"
            onClick={handleClose}
          >
            <X size={16} color="#090909" />
          </p>
        </div>
        <div className="w-full flex flex-col gap-[4px]">
          <h1
            aria-label="Your wager challenge has been created "
            className="text-[24px] font-[600]"
          >
            Your wager challenge has been created
          </h1>
          <p className="text-[14px] font-[400] text-[#120029]">
            Share the invite code below for others to join in
          </p>
        </div>

        <div className="flex justify-center items-center space-x-3 my-5">
          <h1 aria-label="invite Code" className="sm:text-[48px] text-[30px] font-[800]">
            {inviteCode}
          </h1>
          <span
            className="hover:cursor-pointer w-fit"
            onClick={handleCopyCode}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
          >
            <Copy color="#9747FF" />
            {isCopied && <span className="sr-only">Copied!</span>}
          </span>
        </div>

        <div className="flex flex-col gap-[12px]">
          <div className="flex w-full border-b border-black/30 justify-between text-[16px] font-[400]">
            <span className="p-[12px] text-[#636363]">Game Mode</span>
            <span className="font-[500]">{challengeData.gameMode}</span>
          </div>
          <div className="flex w-full border-b border-black/30 justify-between text-[16px] font-[400]">
            <span className="p-[12px] text-[#636363]">
              Number of Participants
            </span>
            <span className="font-[500]">{challengeData.participants}</span>
          </div>
          <div className="flex w-full border-b border-black/30 justify-between text-[16px] font-[400]">
            <span className="p-[12px] text-[#636363]">Wager Amount</span>
            <span className="font-[500]">{challengeData.wagerAmount}</span>
          </div>
          <div className="flex w-full border-b border-black/30 justify-between text-[16px] font-[400]">
            <span className="p-[12px] text-[#636363]">Wager Value</span>
            <span className="font-[500]">{challengeData.wagerValue}</span>
          </div>
          <div className="flex w-full border-b border-black/30 justify-between text-[16px] font-[400]">
            <span className="p-[12px] text-[#636363]">You Win</span>
            <span className="font-[600] text-[#9747FF]">
              {challengeData.potentialWin}
            </span>
          </div>
        </div>

        <div className="border-[0.5px] p-[16px] rounded-[12px] gap-[17px] bg-[#F0F0F0] flex flex-col mt-5">
          <div className="flex space-x-1 items-center text-[#9747FF]">
            <Lightbulb size={16} />
            <span className="text-[12px] font-[500]">INSTRUCTION</span>
          </div>
          <p className="text-[16px] bg-white font-[400] text-[#08090A] border p-[16px] rounded-[8px] border-[#DBE1E7]">
            A card displaying a lyric from a song will appear along with a list
            of possible answers. Your goal is to score the highest point amongst
            your challengers.
          </p>
        </div>

        <div className="w-full flex gap-[32px] mb-10 mt-20">
          <button
            type="button"
            onClick={handleShareInvite}
            className="w-full rounded-full bg-transparent border border-[#9747FF] hover:bg-[#9747FF] text-[#9747FF] py-[24px] hover:text-white text-[16px] font-[600] transition-all duration-200"
          >
            Share Invite Code
          </button>
          <button
            type="button"
            onClick={handleStartChallenge}
            className="w-full rounded-full bg-[#9747FF] border border-[#9747FF] hover:bg-transparent text-white py-[24px] hover:text-[#9747FF] text-[16px] font-[600] transition-all duration-200"
          >
            Start Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
