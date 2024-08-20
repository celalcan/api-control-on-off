import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';

// JSON Server'ı oluşturun
const server = jsonServer.create();

// Dosya yolunu doğru ayarlayın
const filePath = path.join(process.cwd(), 'db.json');
const data = fs.readFileSync(filePath, 'utf-8');
const db = JSON.parse(data);
const router = jsonServer.router(db);

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server is running');
});

// Server API'yi dışa aktarın
export default server;
