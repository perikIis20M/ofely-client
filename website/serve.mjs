import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../docs');
const port = Number(process.env.PORT || 4178);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain','.xml':'application/xml'};
const server = http.createServer(async (req,res)=>{
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let filename = path.resolve(root,'.'+pathname);
    if (filename !== root && !filename.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
    const stat = await fs.stat(filename).catch(()=>null);
    if (stat?.isDirectory()) {
      if (!pathname.endsWith('/')) {res.writeHead(301,{Location:pathname+'/'+new URL(req.url,'http://localhost').search});res.end();return;}
      filename = path.join(filename,'index.html');
    }
    const data = await fs.readFile(filename);
    res.writeHead(200,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await fs.readFile(path.join(root,'404.html')).catch(()=>Buffer.from('Not found')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Bedwarsers preview: http://127.0.0.1:${port}`));
