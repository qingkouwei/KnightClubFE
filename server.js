#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url);
    let pathname = decodeURI(parsedUrl.pathname);
    
    // 默认为index.html
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const filePath = path.join(ROOT_DIR, pathname);
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 文件不存在
                fs.readFile(path.join(ROOT_DIR, '404.html'), (err, content) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    res.end(content || 'File not found', 'utf-8');
                });
            } else {
                // 服务器错误
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            // 成功响应
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`服务器运行中: http://localhost:${PORT}`);
    console.log(`按 Ctrl+C 停止服务`);
});
