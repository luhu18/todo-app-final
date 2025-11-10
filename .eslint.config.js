// Import the necessary modules for the new flat config
import globals from "globals";
import eslint from "@eslint/js";

export default [
    // 1. Extend the baseline recommended rules
    eslint.configs.recommended,
    {
        // 2. Define files and language options
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                // Combine browser and node globals so all your functions are recognized
                ...globals.browser,
                ...globals.node
            }
        },
        // 3. Define the custom rules
        rules: {
            // Enforce using single quotes for strings
            "quotes": ["error", "single"],
            
            // Flags unused variables (Warning)
            "no-unused-vars": "warn",
            
            // Always require a semicolon at the end of a statement (Error)
            "semi": ["error", "always"],

            // Require 'const' or 'let' instead of 'var' (Error)
            "no-var": "error"
        }
    }
];