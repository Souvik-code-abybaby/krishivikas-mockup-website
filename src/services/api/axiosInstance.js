import axios from 'axios'
const baseURL = "https://d32neyt9p9wyaf.cloudfront.net/api/v3"; // staging server

const apiClient = axios.create({ baseURL });
export default apiClient;