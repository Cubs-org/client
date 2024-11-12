const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000',
    API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000',
    SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'ws://localhost:5000'

export { BASE_URL, API_URL, SOCKET_URL }
