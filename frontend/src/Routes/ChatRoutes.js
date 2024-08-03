import toast from "react-hot-toast";
import baseUrl from "../utils/baseURL";


export const Add_chat = async ({ receiver_id }) => {
    try {
        let response = await baseUrl.post(
            "/chat/add-chat",
            { receiver_id },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const Fetch_chat = async () => {
    try {
        let response = await baseUrl.get("/chat/fetch-chats", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const SelectedChatInfo = async ({ chatId }) => {
    try {
        let response = await baseUrl.get(`/chat/selected-chat?search=${chatId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
        });
        return response;
    } catch (error) {
        console.log(error);
    }
};