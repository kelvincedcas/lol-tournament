import axios from 'axios';

export const TournamentApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
