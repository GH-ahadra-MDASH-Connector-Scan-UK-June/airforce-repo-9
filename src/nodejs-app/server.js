const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/api/exec', (req, res) => {
    const { cmd } = req.query;
    // Command injection
    exec(cmd, (error, stdout, stderr) => {
        res.json({ output: stdout, error: stderr });
    });
});

app.get('/api/file', (req, res) => {
    const { name } = req.query;
    // Path traversal
    const filePath = path.join('/data', name);
    const content = fs.readFileSync(filePath, 'utf8');
    res.send(content);
});

app.post('/api/eval', (req, res) => {
    const { code } = req.body;
    // Eval injection
    const result = eval(code);
    res.json({ result });
});

app.get('/api/redirect', (req, res) => {
    const { url } = req.query;
    // Open redirect
    res.redirect(url);
});

app.listen(3000, () => console.log('Server running on port 3000'));
