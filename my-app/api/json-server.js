import jsonServer from 'json-server';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ES modülleri ile __dirname'i elde etme
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json')); // Veritabanı dosyasının yolu
const middlewares = jsonServer.defaults();

server.use(cors()); // CORS'i ekle
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server ${PORT} portunda çalışıyor`);
});
