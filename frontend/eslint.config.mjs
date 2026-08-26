import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Pre-existing deliberate patterns; flagged only by the new React
      // Compiler diagnostics added in eslint-plugin-react-hooks v7.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
    },
  },
  eslintPluginPrettierRecommended,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
