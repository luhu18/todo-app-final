// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';

// Node.js doesn't have __dirname in ES Module environment, so we create it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    // 1. Set the mode (production mode optimizes and minifies the code)
    mode: 'production', 

    // 2. Define the ENTRY point (where Webpack starts reading your code)
    entry: {
        main: path.resolve(__dirname, 'App.js'), 
    },

    // 3. Define the OUTPUT (where Webpack saves the bundled file)
    output: {
        path: path.resolve(__dirname, 'dist'), // The output directory is named 'dist'
        filename: 'bundle.js', // The final file will be named 'bundle.js'
        clean: true, // Clean the 'dist' folder before each new build
    },
};