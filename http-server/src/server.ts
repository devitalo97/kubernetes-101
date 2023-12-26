import http from 'http';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Olá, mundo kube!!!!!!!!!!!!!!!!');
});

const port = 8000;

server.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
