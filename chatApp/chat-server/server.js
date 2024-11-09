const WebSocket = require('ws'); // Importar la librería WebSocket (ws) para crear un servidor WebSocket

// Crear un nuevo servidor WebSocket
const server = new WebSocket.Server({ port: 8080, host: '0.0.0.0' });
// port: 8080 especifica el puerto donde el servidor WebSocket escuchará las conexiones
// host: '0.0.0.0' indica que el servidor estará disponible en todas las interfaces de red, es decir, accesible desde cualquier dirección IP en la red local

// Configurar el evento connection para manejar nuevas conexiones de clientes
server.on('connection', (socket) => {
  console.log('Nuevo cliente conectado'); // Mensaje en consola para confirmar la conexión de un cliente

  // Configurar el evento message para recibir mensajes de los clientes
  socket.on('message', (message) => {
    console.log('Mensaje recibido: ${message}'); // Mostrar el mensaje recibido en la consola

    // Enviar el mensaje recibido a todos los clientes conectados
    server.clients.forEach((client) => {
      // Verificar si el cliente está en estado de conexión abierta antes de enviarle el mensaje
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Enviar el mensaje al cliente
      }
    });
  });

  // Configurar el evento close para manejar la desconexión de un cliente
  socket.on('close', () => {
    console.log('Cliente desconectado'); // Mensaje en consola para confirmar la desconexión
  });
});

// Confirmar que el servidor WebSocket está funcionando y listo para recibir conexiones
console.log('Servidor WebSocket escuchando en ws://localhost:8080');