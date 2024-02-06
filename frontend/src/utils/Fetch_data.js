import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import baseUrl from './baseURL';


export const Login = async ({ userEmail, password }) => {
  try {
    let response = await baseUrl.post('/user/login',
      { userEmail, password }, {}
    )
    localStorage.setItem("jwt_token", response.data.token);
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
    toast.error(error.response.data.msg)
  }
}

export const Register = async ({ userEmail, userName, password }) => {
  try {
    let response = await baseUrl.post('/user/register',
      { userEmail, userName, password }, {}
    )
    localStorage.setItem("jwt_token", response.data.token);
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
    toast.error(error.response.data.msg)
  }
}

export const Verify = async ({ otp, userID }) => {
  try {
    let response = await baseUrl.post('/user/verifyotp',
      { otp, userID }, {}
    )
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Forgot_Password = async (
  { userEmail }) => {
  try {
    let response = await baseUrl.post('/user/forgot-password',
      { userEmail }, {}
    )
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Reset_Password = async ({ id, token, password }) => {
  try {
    let response = await baseUrl.post('/user/reset-password',
      { id, token, password }, {}
    )
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Get_all_users = async () => {
  try {
    let response = await baseUrl.get('/user/get-all-users', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      }
    })
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Search_user = async ({ query}) => {
  try {
    let response = await baseUrl.get(`/user/search/${query}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Add_chat = async ({ receiver_id }) => {
  try {
    let response = await baseUrl.post('/chat/add-chat', { receiver_id }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Fetch_chat = async () => {
  try {
    let response = await baseUrl.get('/chat/fetch-chats', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Create_group = async ({ users, grpname }) => {
  try {
    let response = await baseUrl.post('/chat/create-group', { users, grpname }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    console.log(error);
  }
}

export const Rename_group = async ({ chatId, newgrpname }) => {
  try {
    let response = await baseUrl.post('/chat/rename-group', { chatId, newgrpname }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    toast.success(response.data.msg)
    return response;
  }
  catch (error) {
    toast.error(error.response.data.msg);
    console.log(error);
  }
}

export const Remove_member_from_group = async ({ chatId, memberId }) => {
  try {
    let response = await baseUrl.post('/chat/remove-from-group', { chatId, memberId }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    toast.error(error.response.data.msg);
    console.log(error);
  }
}

export const Add_to_group = async ({ chatId, memberId }) => {
  try {
    let response = await baseUrl.post('/chat/add-to-group', { chatId, memberId }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    toast.success(response.data.msg);
    return response;
  }
  catch (error) {
    toast.error(error.response.data.msg);
    console.log(error);
  }
}

export const Send_message = async ({ content, chatId }) => {
  try {
    let response = await baseUrl.post('/message/send-message', { content, chatId }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    return response;
  }
  catch (error) {
    toast.error(error.response.data.msg);
    console.log(error);
  }
}

export const Get_all_messages = async ({ chatId }) => {
  try {
    let response = await baseUrl.get(`/message/get-all-messages/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    })
    return response;
  }
  catch (error) {
    console.log(error);
  }
}
