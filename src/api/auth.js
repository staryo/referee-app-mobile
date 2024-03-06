import axios from "axios";
import { BACKEND_URL } from "../const";

async function signUp(data) {
  const { email, password, repeatPassword, firstName, lastName } = data;
  try {
    const result = await axios.post(`${BACKEND_URL}/signUp`, {
      email,
      password,
      repeatPassword,
      firstName,
      lastName,
    });
    return new Promise((resolve) => resolve(result));
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}

async function login(userEmail, userPassword) {
  try {
    const result = await axios.post(`${BACKEND_URL}/auth/login`, {
      "email": userEmail,
      "password": userPassword,
    });
    return new Promise((resolve) => resolve(result.data));
  } catch (err) {
    // console.log(err)
    return new Promise((resolve, reject) => reject(err));
  }
}

async function logout() {
  try {
    // console.log(`${BACKEND_URL}/auth/logout`)
    const result = await axios.post(`${BACKEND_URL}/auth/logout`);
    // console.log('result', result.data)
    return new Promise((resolve) => resolve(result));
  } catch (err) {
    return new Promise((resolve, reject) => reject(err));
  }
}


export { login, logout, signUp };