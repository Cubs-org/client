import API from "."

export default async function fetchWorkspace(userId: string) {
    try {
        const response = await API.get(`/workspace/${userId}`);
        if (response.data.status === 200) {
            return response.data.workspace;
        } else {
            throw new Error(response.data.message);
        }
    } catch(error) {
        (error)
    }
}