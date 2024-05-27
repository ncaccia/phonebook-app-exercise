import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginJs from "@eslint/js";

export default [
  {
    // Enable CommonJS syntax parsing for all JS files
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: 2022, // Specify ECMAScript version for better parsing
    },
  },
  {
    // Define global variables for the browser environment
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Define global variables for the Node.js environment
    languageOptions: {
      globals: globals.node,
    },
  },
  // Extend ESLint recommended rules
  pluginJs.configs.recommended,
  {
    // Ignore specific files and directories
    ignores: ["**/dist", "mongo.js", "eslint.config.mjs"],
  },
  {
    // Apply stylistic and other rules
    plugins: { "@stylistic/js": stylisticJs },
    rules: {
      "@stylistic/js/indent": ["error", 2], // Enforce 2-space indentation
      "@stylistic/js/linebreak-style": ["error", "unix"], // Enforce Unix-style line endings
      "@stylistic/js/quotes": ["error", "double"], // Enforce double quotes
      eqeqeq: "error", // Enforce strict equality comparisons
      "array-callback-return": "error", //Enforce Return Statements in Callbacks
      "no-alert": "warn", // Disallow alert, confirm, and prompt
      "no-eval": "error", // Disallow eval()
      "no-extend-native": "error", // Disallow Extending Native Objects:
      "no-trailing-spaces": "error", // Disallow trailing spaces
      "object-curly-spacing": ["error", "always"], // Enforce spacing around object curly braces
      "arrow-spacing": ["error", { before: true, after: true }], // Enforce spacing around arrow function parameters
      "no-multiple-empty-lines": "error", // Disallow multiple empty lines
      "no-unneeded-ternary": "warn", // Warn on unneeded ternary expressions
      "no-console": 0, // Disable the `no-console` rule
    },
  },
];
