const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fetch = require('node-fetch');
const yaml = require('js-yaml');
const fs = require('fs');

// Load configuration
const config = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yaml'), 'utf8'));

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: config.window.width,
        height: config.window.height,
        minWidth: config.window.min_width,
        minHeight: config.window.min_height,
        title: config.window.title,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));
    
    // Open DevTools in development
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

// Create required directories
function createDirectories() {
    const dirs = [
        config.paths.downloads,
        config.paths.temp,
        config.paths.logs
    ];
    
    dirs.forEach(dir => {
        const dirPath = path.join(app.getPath('userData'), dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
}

app.whenReady().then(() => {
    createDirectories();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle API calls
ipcMain.handle('generate-image', async (event, prompt) => {
    try {
        // Enhance the prompt with specific instructions
        const enhancedPrompt = `Create a Ghibli like image (without any script on it) using these elements in it: "${prompt}".`;
        const response = await fetch(
            `${config.api.cloudflare.endpoint}/${config.api.cloudflare.account_id}/ai/run/${config.api.cloudflare.model}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${config.api.cloudflare.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: enhancedPrompt })
            }
        );

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('image/')) {
            const buffer = await response.buffer();
            return {
                result: {
                    image_base64: buffer.toString('base64')
                }
            };
        } else {
            return await response.json();
        }
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}); 
