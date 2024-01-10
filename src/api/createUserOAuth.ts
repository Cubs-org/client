import API from ".";

async function createUserOAuth(access_token: string) {
  
  try {
    const response = await API.post(`/registerUser`, {
        access_token,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching oauth:', error);
  }
}

export default createUserOAuth;