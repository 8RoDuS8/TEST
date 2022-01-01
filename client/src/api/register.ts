import { request } from "./requests";

const url = "api/register";


type ResponseType = { token: string };

const register = (email: string, username: string, password: string) =>
  async (onSuccess: (token: string) => void, onError: (error: string) => void) => {

    const response = await request<ResponseType>("POST", url, { email, username, password });
    if (!response.success) return onError(response.error ?? "internal error");
    return onSuccess(response.data.token);
  };

export default register;