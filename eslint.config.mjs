import next from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";

/**
 * Native ESLint 9 flat config.
 *
 * The old setup went through `@eslint/eslintrc` + `eslint-config-next`,
 * which crashes on ESLint 9 (circular structure in the legacy validator).
 * This wires the Next and TypeScript plugins directly instead, so
 * `npm run lint` runs. Type correctness is covered separately by
 * `npm run typecheck` (tsc --noEmit).
 */
export default tseslint.config(
  {
    // BqHw6rdCE.js is an AdMaven verification file (plain text, not JS).
    ignores: [".next/**", "out/**", "build/**", "node_modules/**", "BqHw6rdCE.js"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
);
