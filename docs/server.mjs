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
    let relativePath = pathname.slice(basePath.length) || 'index.html';
    if (relativePath === 'ui-spec') {
      res.writeHead(308, { Location: `${basePath}ui-spec/` }).end();
      return;
    }
    if (relativePath === 'ui-spec/') relativePath = 'ui-spec/index.html';
    const path = resolve(root, relativePath);
    // The UI reference has an explicit asset allowlist; specifications stay private
    // to the checkout, as do package metadata, tests and arbitrary repository files.
    const uiAssets = ['ui-spec/index.html','ui-spec/design-system.css','ui-spec/reference.js','ui-spec/decisions.json','ui-spec/BOOTSTRAP-LICENSE.txt'];
    const uiAsset = uiAssets.includes(relativePath);
    const allowed = path === resolve(root, 'index.html') || path.startsWith(resolve(root, 'src') + sep) || uiAsset;
    const type = types[extname(path)] || (uiAsset && extname(path) === '.json' ? 'application/json' : uiAsset && extname(path) === '.txt' ? 'text/plain' : null);
    if (!allowed || !type) {
      res.writeHead(404).end('Not found');
      return;
    }
    const data = await readFile(path);
    res.writeHead(200, {
      'Content-Type': `${type}; charset=utf-8`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': csp,
    }).end(data);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`Todo agent: http://localhost:${port}${basePath}`));
