import { io } from 'socket.io-client';

export const socket = io('http://10.136.2.27:3001', {
  transports: ['websocket'], 
  upgrade: false
});