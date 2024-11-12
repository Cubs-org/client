import API from '..'

async function updateUser(user) {
    try {
        const response = await API.put(`/user/updateUser`, user)

        throw response.data
    } catch (error) {
        return error
    }
}

export default updateUser
