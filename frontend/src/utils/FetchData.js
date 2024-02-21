import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import baseUrl from "./baseURL.js";

export const LogIn = async ({ userEmail, password }) => {
  try {
    let response = await baseUrl.post(
      "/user/login",
      { userEmail, password },
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

export const Add_chat = async ({ receiver_id }) => {
  try {
    console.log(receiver_id);
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

export const Create_group = async ({ users, grpname }) => {
  try {
    console.log(users, grpname);
    let response = await baseUrl.post(
      "/chat/create-group",
      { users, grpname },
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

export const Add_to_group = async ({ chatId, memberId }) => {
  try {
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

export const Upload_profileimg_of_group = async ({ chatId, file }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    let response = await baseUrl.post(
      `/chat/upload-profileimg/${chatId}`,
      formData,
      {
        headers: {
          "Content-Type": 'multipart/form-data',
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

export const Send_message = async ({ content, chatId }) => {
  try {
    console.log(chatId);
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

export const Upload_profileimg = async ({ file }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    let response = await baseUrl.post(
      `/user/upload-profileimg`,
      formData,
      {
        headers: {
          "Content-Type": 'multipart/form-data',
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