import toast from "react-hot-toast";
import baseUrl from "../utils/baseURL";


export const Send_message = async ({ content, chatId }) => {
    try {
        let response = await baseUrl.post(
            "/message/send-message",
            { content, chatId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Read_Message = async ({ msgId, userId }) => {
    try {

        let response = await baseUrl.put(
            "/message/readBy",
            { msgId, userId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Get_all_messages = async ({ chatId }) => {
    try {
        let response = await baseUrl.get(`/message/get-all-messages/${chatId}`, {
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