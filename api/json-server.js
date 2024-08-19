import { createServer } from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Low, JSONFile } from "lowdb";
import { default as JSONServer } from "json-server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Veritabanını ayarla
const file = new JSONFile(__dirname + "/db.json");
const db = new Low(file);

// İlk veritabanı içeriğini yükle
await db.read();
db.data ||= { status: 0 }; // Varsayılan değer 0
await db.write();

// JSON Server'ı kur
const server = JSONServer.create();
const router = JSONServer.router(db);
const middlewares = JSONServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
const httpServer = createServer(server);

httpServer.listen(PORT, () => {
  console.log(`JSON Server ${PORT} portunda çalışıyor`);
});
