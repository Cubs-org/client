import axios from "axios";
import { BASE_URL } from "../../lib/api";

async function fetchOAuth(access_token: string) {
  
  try {
    const response = await axios.post(`${BASE_URL}/registerUser`, {
        access_token,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching oauth:', error);
  }
}

export default fetchOAuth;