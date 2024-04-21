import API from "..";

async function fetchGoogleUser(access_token:string) {
  if (access_token) {
    try {
      const response = await API.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json'
        }
      });

      if (response.status !== 200 || !response.data) {
        throw new Error('Error fetching user data');
      }

      return response.data;
    } catch (error) {
      console.error(`fetchGoogleUser: ${error}`);
    }
  }
};

export default fetchGoogleUser;