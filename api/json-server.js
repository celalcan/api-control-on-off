const { createServer, Model } = require('json-server');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Veritabanı dosyasının yolu
const dbFile = path.join(__dirname, 'db.json');

// Veritabanını oluştur ve oku
const db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));

// JSON Server'ı kur
const server = createServer();
const router = createServer.router(db);
const middlewares = createServer.defaults();

server.use(cors());
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server ${PORT} portunda çalışıyor`);
});
