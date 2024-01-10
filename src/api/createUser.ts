import API from ".";

async function createUser(user) {
  
  try {
    const response = await API.post(`/UserDB`, user);

    throw response.data;
  } catch (error) {
    return error;
  }
}

export default createUser;