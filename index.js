const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Mock Data
const items = [
  { id: 1, name: 'Antigravity Core', category: 'Technology', status: 'Active' },
  { id: 2, name: 'Quantum Relayer', category: 'Hardware', status: 'Stable' },
  { id: 3, name: 'Neural Link', category: 'Interface', status: 'Maintenance' },
];

// 1. Root Endpoint - Premium Landing Page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Express API Portal</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap" rel="stylesheet">
        <style>
            :root {
                --primary: #6366f1;
                --secondary: #a855f7;
                --bg: #0f172a;
                --card-bg: #1e293b;
                --text: #f8fafc;
            }
            body {
                font-family: 'Outfit', sans-serif;
                background-color: var(--bg);
                color: var(--text);
                margin: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
            }
            .container {
                text-align: center;
                background: var(--card-bg);
                padding: 3rem;
                border-radius: 24px;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                animation: fadeIn 0.8s ease-out;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            h1 {
                font-size: 3rem;
                margin-bottom: 1rem;
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            p {
                color: #94a3b8;
                font-size: 1.1rem;
                margin-bottom: 2rem;
            }
            .endpoints {
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            .badge {
                background: rgba(99, 102, 241, 0.1);
                color: var(--primary);
                padding: 0.5rem 1rem;
                border-radius: 12px;
                font-size: 0.9rem;
                font-weight: 600;
                border: 1px solid rgba(99, 102, 241, 0.2);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Express API</h1>
            <p>A premium, high-performance backend solution.</p>
            <div class="endpoints">
                <span class="badge">GET /api/health</span>
                <span class="badge">GET /api/items</span>
                <span class="badge">GET /api/time</span>
                <span class="badge">POST /api/echo</span>
            </div>
        </div>
    </body>
    </html>
  `);
});

// 2. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    message: 'System is running smoothly'
  });
});

// 3. Get Items Endpoint
app.get('/api/items', (req, res) => {
  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

// 4. Get Single Item
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  res.json({ success: true, data: item });
});

// 5. Echo/Post Endpoint
app.post('/api/echo', (req, res) => {
  res.json({
    message: 'Data received successfully',
    receivedAt: new Date().toISOString(),
    body: req.body
  });
});

// 6. New Endpoint: Server Time
app.get('/api/time', (req, res) => {
  res.json({
    now: new Date().toISOString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    unix: Date.now()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
