import axios, { type AxiosInstance } from 'axios';

export const http: AxiosInstance = axios.create({
    withCredentials: true,
    timeout: 20000
});
