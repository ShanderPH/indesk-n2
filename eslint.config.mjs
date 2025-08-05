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
      "@typescript-eslint/no-unused-vars": [
        "error", 
        { 
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_" 
        }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "react/no-unescaped-entities": "error",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "error"
    }
  }
];

export default eslintConfig;
