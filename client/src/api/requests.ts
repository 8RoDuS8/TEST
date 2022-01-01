import axios, { Method } from "axios";
import JwtManager from "../utils/JwtManager";



type Response<T> = { success: true, data: T } | { success: false, error: string };


const Axios = axios.create({
  baseURL: "https://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
})

const request = async <T>(method: Method, endpoint: string, data?: object): Promise<Response<T>> =>
  (await Axios(endpoint, { method, data }).catch(e => ({ data: e.response.data }))).data;

const protectedRequest = async <T>(method: Method, endpoint: string, data?: object): Promise<Response<T>> =>
  (await Axios(endpoint, {
    method, data, headers: {
      "Authorization": `Bearer ${JwtManager.get()}`
    }
  }).catch(e => ({ data: e.response.data }))).data;



export {
  request, protectedRequest
}