import React, { useEffect, useState } from "react";

export interface QuestionCardData {
  lyric: string;
  kind: string;
  options: string[];
}

export interface RevealData {
  title: string;
  artist: string;
  year: number;
}

export interface QuestionCardProps {
  card: QuestionCardData;
  onSubmit: (selectedIndex: number) => Promise<RevealData | void>;
  onReveal?: () => Promise<RevealData | void>;
  disabled?: boolean;
}

export const QuestionCard: React.FC <QuestionCardProps> = ({
  card,
  onSubmit,
  onReveal,
  disabled = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [reveal, setReveal] = useState<RevealData | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setSelectedIndex(null);
    setReveal(null);
    setSubmitted(false);
    setError(null);
  }, [card.lyric, card.kind]);

  const handleSubmit = async () => {
    if (selectedIndex === null || busy || disabled) {
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const result = await onSubmit(selectedIndex);
      setSubmitted(true);
      if (result) {
        setReveal(result);
      } else if (onReveal) {
        const revealed = await onReveal();
        if (revealed) {
          setReveal(revealed);
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Submission failed");
    } finally {
      setBusy(false);
    }
  };

  const canSubmit = selectedIndex !== null && !submitted && !disabled && !busy;

  return (
    <div className="question-card">
      <p className="question-card__lyric">{card.lyric}</p>
      <p className="question-card__kind">{card.kind}</p>
      <ul className="question-card__options">
        {card.options.map((option, index) => (
          <li key={index}>
            <button
              type="button"
              className={
                selectedIndex === index
                  ? "question-card__option question-card__option--selected"
                  : "question-card__option"
              }
              onClick={() => setSelectedIndex(index)}
              disabled={submitted || disabled || busy}
              aria-pressed={selectedIndex === index}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="question-card__submit"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        {busy ? "Submitting..." : "Submit"}
      </button>
      {error && <p className="question-card__error">{error}</p>}
      {reveal && (
        <div className="question-card__reveal">
          <p className="question-card__reveal-title">{reveal.title}</p>
          <p className="question-card__reveal-artist">{reveal.artist}</p>
          <p className="question-card__reveal-year">{reveal.year}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
