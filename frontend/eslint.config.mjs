import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Enforce proper typing instead of `any` (LF-067).
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
  {
    // Flag hard-coded JSX string literals in the App Router (LF-211).
    // UI copy should be extracted into `messages/*.json` and rendered via
    // `next-intl` (e.g. `t("key")`) instead of being inlined.
    files: ["src/app/**/*.tsx"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        {
          noStrings: true,
          ignoreProps: true,
          allowedStrings: [
            " ",
            ".",
            ",",
            ":",
            ";",
            "!",
            "?",
            "-",
            "—",
            "/",
            "|",
            "•",
            "·",
            "%",
            "&",
            "+",
            "=",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "<",
            ">",
            "*",
            "#",
            "@",
          ],
        },
      ],
    },
  },
];

export default eslintConfig;