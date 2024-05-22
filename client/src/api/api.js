import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api'
});

export const getEvents = async() => await httpClient.get('/');
export const getCountEvents = async() => await httpClient.get('/count');
export const getEventsPagination = async(currentPage) => await httpClient.get(`/pages/${currentPage}`);

export const getEvent = async(eventId) => await httpClient.get(`/${eventId}`);
export const registerParticipant = async(eventId, data) => await httpClient.post(`/${eventId}`, data);

