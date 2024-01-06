import axios from 'axios';
import { BASE_URL } from '../lib/api';

// Criar uma instância do axios para a sua API
const API = axios.create({ baseURL: BASE_URL });

export default API;