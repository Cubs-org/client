import axios from 'axios';
import { API_URL } from '../lib/api';

// Criar uma instância do axios para a sua API
const API = axios.create({ baseURL: API_URL });

export default API;