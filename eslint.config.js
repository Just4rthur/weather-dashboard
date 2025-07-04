import js from "@eslint/js";
import nodePlugin from "eslint-plugin-n";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  js.configs.recommended, // Base JS rules

  // === Backend Rules ===
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      n: nodePlugin,
    },
    rules: {
      "n/no-unsupported-features/es-syntax": "off", // Allow import/export
    },
  },

  // === Frontend Rules (React) ===
  {
    files: ["frontend/**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
