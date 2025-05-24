# featured_ghibli_like_image_generator
Generate a featured Ghibli like image from some keywords for your text, article, film, ....

# Ghibli-like Image Generator

## Description

This is a desktop application built with Electron that transforms various text inputs (articles, stories, descriptions, etc.) into beautiful, Ghibli-like artistic images using an AI image generation model (Cloudflare AI).

The application allows users to input any text and generate a unique visual representation in the style of Studio Ghibli, intended to capture the essence and key concepts of the text in a visually appealing image format, without including text or characters on the image itself.

## Features

-   Generate Ghibli-like artistic images from any text input.
-   Uses the Cloudflare AI image generation service.
-   Configurable settings via `config.yaml` (API key, window size, etc.).
-   Built as a standalone executable for easy distribution.
-   Includes a custom header with a logo and a footer.
-   (Potential) Uses NLP to extract key terms from input text for prompt enhancement (requires manual code verification in main.js).

## Prerequisites

-   Node.js and npm installed on your system.
-   Access to a Cloudflare AI account and an API token for image generation.

## Installation

1.  Clone or download the project files.
2.  Navigate to the project directory in your terminal.
3.  Install the project dependencies:

    ```bash
    npm install
    ```

## Configuration

Application settings, including the Cloudflare API token and endpoint, window dimensions, and file paths, are managed in the `config.yaml` file. You **must** update this file with your Cloudflare API token before running or building the application.

```yaml
# Example config.yaml structure (refer to the file for complete options)
api:
  cloudflare:
    account_id: "YOUR_ACCOUNT_ID" # Replace with your Cloudflare Account ID
    model: "@cf/stabilityai/stable-diffusion-xl-base-1.0"
    token: "YOUR_API_TOKEN" # Replace with your Cloudflare API Token
    endpoint: "https://api.cloudflare.com/client/v4/accounts"

window:
  width: 1200
  height: 800
  min_width: 800
  min_height: 600
  title: "Ghibli Image Generator"

paths:
  downloads: "downloads"
  temp: "temp"
  logs: "logs"
```

## Usage

### Development Mode

To run the application in development mode (with developer tools enabled):

```bash
npm start
```

### Building the Executable

To build a standalone executable installer for your operating system (e.g., `.exe` for Windows):

```bash
npm run build
```

The executable will be generated in the `dist` folder in your project directory.

## Customization (Advanced)

-   **Prompt Engineering:** The core prompt sent to the AI model can be adjusted in `main.js` within the `ipcMain.handle('generate-image', ...)` function to influence the style and content of the generated images. This is where you refine the "Ghibli like" instruction and the negative prompts (e.g., "no text", "no characters").
-   **Frontend UI:** The user interface is in `public/index.html`. You can modify the HTML, CSS, and client-side JavaScript (be aware of the communication via `ipcRenderer` with `main.js`).

## Built With

-   [Electron](https://www.electronjs.org/) - Desktop application framework
-   [Node.js](https://nodejs.org/) - JavaScript runtime
-   [npm](https://www.npmjs.com/) - Package manager
-   [js-yaml](https://github.com/nodeca/js-yaml) - YAML parser
-   [node-fetch](https://github.com/node-fetch/node-fetch) - Fetch API for Node.js
-   [compromise](https://compromise.cool/) - NLP library (for potential future enhancement)
-   [electron-builder](https://www.electron.build/) - Packaging and building executables
-   Cloudflare AI - Image generation service

---

Made by Ketabbase
