import API from "..";

async function getUser(userId: string) {
    try {
        const user = await API.get(`/user/getUser?userId=${userId}`) as any;

        if (user.status !== 200) {
            throw new Error(user.message);
        } else if (!user.data) {
            throw new Error(user.message);
        }

        return user;
    } catch (error) {
        console.error("Error while getting user: ", error);
    }
}

export default getUser;