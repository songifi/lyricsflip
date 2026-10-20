import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type RoundResult = {
  score: number;
  genre: string;
  rank: number;
};

async function getRoundResult(roundId: string): Promise<RoundResult> {
  const fallback: RoundResult = {
    score: 0,
    genre: "Unknown",
    rank: 0,
  };

  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/rounds/${roundId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return fallback;
    }

    const data = (await res.json()) as Partial<RoundResult>;

    return {
      score: typeof data.score === "number" ? data.score : fallback.score,
      genre: typeof data.genre === "string" ? data.genre : fallback.genre,
      rank: typeof data.rank === "number" ? data.rank : fallback.rank,
    };
  } catch {
    return fallback;
  }
}

export async function generateAlt({ params }: { params: { roundId: string } }) {
  const { score, genre, rank } = await getRoundResult(params.roundId);
  return `Round result: ${score} points in ${genre}, rank #${rank}`;
}

export const alt = "LyricsFlip round result";

export default async function Image({
  params,
}: {
  params: { roundId: string };
}) {
  const { score, genre, rank } = await getRoundResult(params.roundId);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #7c3aed 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span>LyricsFlip</span>
          <span
            style={{
              fontSize: 28,
              fontWeight: 500,
              padding: "8px 24px",
              borderRadius: 9999,
              background: "rgba(255, 255, 255, 0.15)",
            }}
          >
            Round Results
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
            }}
          >
            <span
              style={{
                fontSize: 200,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              {score}
            </span>
            <span style={{ fontSize: 56, fontWeight: 600, opacity: 0.85 }}>
              pts
            </span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 44,
              fontWeight: 600,
              opacity: 0.9,
            }}
          >
            {genre}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 700,
            padding: "20px 48px",
            borderRadius: 24,
            background: "rgba(255, 255, 255, 0.15)",
            alignSelf: "center",
          }}
        >
          Rank #{rank}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}