import { protectedRequest } from "./requests";

const url = "api/auth";


type ResponseType = { username: string, authenticated: boolean };

const authUser = () =>
  async (onSuccess: (username: string, authenticated: boolean) => void, onError: (error: string) => void) => {
    const response = await protectedRequest<ResponseType>("GET", url);
    if (!response.success) return onError(response.error ?? "internal error");
    return onSuccess(response.data.username, response.data.authenticated);
  };

export default authUser;