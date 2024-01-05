import axios from "axios";
import { BASE_URL } from "../../lib/api";

async function fetchUser(data) {

  const user = {
    id: data?.id,
    email: data?.email,
    name: data?.name,
    password: data?.password,
    icon: data?.picture,
  };
  
  try {
    const response = await axios.post(`${BASE_URL}/registerUser`, user);

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

export default fetchUser;