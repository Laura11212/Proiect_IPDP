import { io } from 'socket.io-client';

export const socket = io('https://proiect-ipdp-server-ludo.onrender.com', {
  transports: ['websocket'], 
  upgrade: false
});