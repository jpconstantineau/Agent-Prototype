import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
import { contentSecurityPolicy } from './server-policy.mjs';

const root = fileURLToPath(new URL('./', import.meta.url));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
const port = Number(process.env.PORT || 5173);
const basePath = `/${(process.env.BASE_PATH || '').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');
const csp = contentSecurityPolicy(process.env.LOCAL_MODEL_ORIGINS);
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (basePath !== '/' && pathname === basePath.slice(0, -1)) {
      res.writeHead(308, { Location: basePath }).end();
      return;
    }
    if (!pathname.startsWith(basePath)) { res.writeHead(404).end('Not found'); return; }
    const relativePath = pathname.slice(basePath.length) || 'index.html';
    const path = resolve(root, relativePath);
    // Serve only the app entry point and its static source, never arbitrary repo files.
    const allowed = path === resolve(root, 'index.html') || path.startsWith(resolve(root, 'src') + sep);
    if (!allowed || !types[extname(path)]) {
      res.writeHead(404).end('Not found');
      return;
    }
    const data = await readFile(path);
    res.writeHead(200, {
      'Content-Type': `${types[extname(path)]}; charset=utf-8`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': csp,
    }).end(data);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Todo agent: http://localhost:${port}${basePath}`));
