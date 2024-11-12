import axios from 'axios'

async function fetchData(data) {
    if (data) {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data?.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${data?.access_token}`,
                        Accept: 'application/json',
                    },
                }
            )

            return response.data
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }
}

export default fetchData
