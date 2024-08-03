import toast from "react-hot-toast";
import baseUrl from "../utils/baseURL";


export const Get_all_users = async () => {
    try {
        let response = await baseUrl.get("/user/get-all-users", {
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

export const Search_user = async ({ name }) => {
    try {
        let response = await baseUrl.get(`/user/search?name=${name}`, {
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

export const Rename_user = async ({ userId, newusername }) => {
    try {
        let response = await baseUrl.post(
            "/user/rename-user",
            { userId, newusername },
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

export const Upload_profileimg = async ({ file }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        let response = await baseUrl.post(`/user/upload-profileimg`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            },
        });
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        toast.error(error.response.data.msg);
        console.log(error);
    }
};