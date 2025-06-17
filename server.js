// ngrok "ngrok http 80" 
// ngrok http http://localhost:8080



// server.js (ES module style)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8080;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static JS from /src
app.use('/src', express.static(path.join(__dirname, 'src')));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
