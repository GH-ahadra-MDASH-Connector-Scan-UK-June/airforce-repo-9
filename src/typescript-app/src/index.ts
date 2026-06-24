import express, { Request, Response } from 'express';
import { createConnection } from 'mysql2';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
app.use(express.json());

const db = createConnection({
    host: 'localhost',
    user: 'root',
    database: 'airforce'
});

app.get('/users', (req: Request, res: Response) => {
    const name: string = req.query.name as string;
    // SQL Injection
    const query = `SELECT * FROM users WHERE name = '${name}'`;
    db.query(query, (err, results) => {
        res.json(results);
    });
});

app.get('/system', (req: Request, res: Response) => {
    const command: string = req.query.cmd as string;
    // Command injection
    const output = execSync(command).toString();
    res.send(output);
});

app.get('/download', (req: Request, res: Response) => {
    const file: string = req.query.path as string;
    // Path traversal
    const fullPath = path.resolve('/files', file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    res.send(content);
});

app.post('/template', (req: Request, res: Response) => {
    const { template } = req.body;
    // Eval injection
    const result = eval('`' + template + '`');
    res.send(result);
});

app.listen(4000, () => console.log('TypeScript app running on port 4000'));
