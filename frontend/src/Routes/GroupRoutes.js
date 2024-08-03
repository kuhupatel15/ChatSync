import toast from "react-hot-toast";
import baseUrl from "../utils/baseURL";


export const Create_group = async ({ users, grpname, file }) => {
    try {
        const formData = new FormData();
        if (file) {
            formData.append("file", file);
        }
        formData.append("users", JSON.stringify(users));
        formData.append("grpname", grpname);

        let response = await baseUrl.post("/chat/create-group", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
        });
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const Upload_profileimg_of_group = async ({ chatId, file }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        let response = await baseUrl.post(
            `/chat/upload-profileimg/${chatId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Rename_group = async ({ chatId, newgrpname }) => {
    try {
        let response = await baseUrl.post(
            "/chat/rename-group",
            { chatId, newgrpname },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Remove_member_from_group = async ({ chatId, memberId }) => {
    try {
        let response = await baseUrl.post(
            "/chat/remove-from-group",
            { chatId, memberId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Exit_from_group = async ({ chatId, memberId }) => {
    try {
        let response = await baseUrl.put(
            "/chat/exit-group",
            { chatId, memberId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};

export const Add_to_group = async ({ chatId, memberid }) => {
    try {
        const memberId = memberid[0];
        let response = await baseUrl.post(
            "/chat/add-to-group",
            { chatId, memberId },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
                },
            }
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};