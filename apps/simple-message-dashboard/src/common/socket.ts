import { io } from 'socket.io-client';
export const serviceName = '默认服务';
export const serviceUrl = import.meta.env.VITE_DEFAULT_SERVER;
export const socket = io(serviceUrl);
