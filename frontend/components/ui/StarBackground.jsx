import { useEffect, useRef } from "react";
import gsap from "gsap";

export function StarBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStars = () => {
      const starCount = 200; // Number of stars
      const stars = [];
      const colors = [
        "rgba(112, 226, 199, 0.8)", // Primary accent
        "rgba(160, 102, 255, 0.7)", // Subtle purple
        "rgba(255, 255, 255, 1)",   // Bright white
        "rgba(70, 200, 230, 0.8)", // Soft blue
      ];

      // Clear existing stars
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 2 + 1; // Star size (1px - 3px)
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isTopLeft = Math.random() < 0.2; // 20% of stars in the top-left area

        star.className = "absolute rounded-full";

        Object.assign(star.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: isTopLeft
            ? `${Math.random() * 30}vw` // Concentrated in the top-left (0-30vw)
            : `${Math.random() * 100}vw`, // Spread across full width
          top: isTopLeft
            ? `${Math.random() * 30}vh` // Concentrated in the top-left (0-30vh)
            : `${Math.random() * 100}vh`, // Spread across full height
          opacity: Math.random() * 0.6 + 0.4, // Base opacity (0.4 - 1.0)
          backgroundColor: color,
          boxShadow: `0 0 ${size * 5}px ${color}`, // Soft glow
        });

        container.appendChild(star);
        stars.push(star);
      }

      // Blinking effect
      const blinkingStars = stars.slice(0, Math.floor(stars.length * 0.3)); // 30% of stars blink
      gsap.timeline({ repeat: -1 })
        .to(blinkingStars, {
          opacity: () => Math.random() * 0.6 + 0.4, // Randomized blinking opacity
          duration: () => Math.random() * 1.5 + 0.5, // Smooth transition (0.5-2s)
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            amount: 8, // Spread over time
          },
        });

      // Motion effect for selected stars
      const movingStars = stars.filter((_, index) => index < starCount * 0.3); // Top-left stars only
      gsap.timeline({ repeat: -1 })
        .to(movingStars, {
          x: () => Math.random() * 20 - 10, // Horizontal movement (-10px to 10px)
          y: () => Math.random() * 20 - 10, // Vertical movement (-10px to 10px)
          duration: () => Math.random() * 4 + 2, // Duration (2-6s)
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          stagger: {
            amount: 10, // Spread motion across 10s
          },
        });

      // Random disappearing and reappearing
      const disappearingStars = stars.slice(
        Math.floor(stars.length * 0.2),
        Math.floor(stars.length * 0.5)
      ); // 20%-50% of stars disappear randomly
      gsap.timeline({ repeat: -1 })
        .to(disappearingStars, {
          opacity: 0,
          duration: () => Math.random() * 2 + 1, // Disappear duration (1-3s)
          ease: "power1.in",
          repeat: -1,
          yoyo: true,
          stagger: {
            amount: 12, // Spread across 12s
          },
        });
    };

    createStars();
    window.addEventListener("resize", createStars);

    return () => {
      window.removeEventListener("resize", createStars);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background: `
          radial-gradient(
            ellipse at top left, 
            rgba(112, 226, 199, 0.15) 0%, /* Subtle reflection */
            rgba(4, 3, 17, 0.8) 50%,
            transparent 70%
          ),
          radial-gradient(
            ellipse at top right, 
            rgba(160, 102, 255, 0.3) 0%, /* Faint reflection at top-right */
            rgba(4, 3, 17, 0.8) 50%,
            transparent 70%
          ),
          linear-gradient(
            180deg,
            rgba(4, 3, 17, 1) 0%,
            rgba(9, 6, 35, 1) 100%
          )
        `,
        backdropFilter: "blur(2px)",
      }}
    />
  );
}
