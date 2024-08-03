import toast from "react-hot-toast";
import baseUrl from "../utils/baseURL";


export const LogIn = async ({ userEmail, password, email }) => {
    try {
        let response = await baseUrl.post(
            "/user/login",
            { userEmail, password, email },
            {}
        );
        localStorage.setItem("jwt_token", response.data.token);
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
    }
};

export const Register = async ({ userEmail, userName, password }) => {
    try {
        let response = await baseUrl.post(
            "/user/register",
            { userEmail, userName, password },
            {}
        );
        localStorage.setItem("jwt_token", response.data.token);
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg);
    }
};

export const Verify = async ({ otp, userID }) => {
    try {
        let response = await baseUrl.post("/user/verifyotp", { otp, userID }, {});
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const Forgot_Password = async ({ userEmail }) => {
    try {
        let response = await baseUrl.post(
            "/user/forgot-password",
            { userEmail },
            {}
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const Reset_Password = async ({ id, token, password }) => {
    try {
        let response = await baseUrl.post(
            "/user/reset-password",
            { id, token, password },
            {}
        );
        toast.success(response.data.msg);
        return response;
    } catch (error) {
        console.log(error);
    }
};