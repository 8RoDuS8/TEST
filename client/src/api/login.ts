import { request } from "./requests";

const url = "api/login";

type ResponseType = { token: string };

const login =
  (username: string, password: string) =>
    async (onSuccess: (token: string) => void, onError: (error: string) => void) => {
      try {
        const response = await request<ResponseType>("POST", url, { username, password });
        if (!response.success) return onError(response.error ?? "Internal Error");
        return onSuccess(response.data.token);
      } catch (e) {
        onError("Internal Error");
      }
    };

export default login;
