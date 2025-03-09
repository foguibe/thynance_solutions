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
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off", // Disable errors for unused variables
      "@typescript-eslint/no-explicit-any": "off", // Allow use of 'any'
      "@typescript-eslint/no-require-imports": "off", // Allow `require()` style imports
      "prefer-const": "warn", // Show warning instead of an error for 'prefer-const'
    },
  },
];

export default eslintConfig;
