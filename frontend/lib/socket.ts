// /lib/socket.ts
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
  withCredentials: true,
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('✅ Socket connected:', socket.id);
});

export default socket;
