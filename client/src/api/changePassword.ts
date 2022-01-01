import { protectedRequest } from "./requests";

const url = "api/updatePassword";

type ResponseType = { token: string };

const changePassword =
  (oldPassword: string, newPassword: string, newPasswordRepeat: string) =>
    async (onSuccess: (token: string) => void, onError: (error: string) => void) => {
      try {
        const response = await protectedRequest<ResponseType>("POST", url, { oldPassword, newPassword, newPasswordRepeat });
        if (!response.success) return onError(response.error ?? "Internal Error");
        return onSuccess(response.data.token);
      } catch (e) {
        onError("Internal Error");
      }
    };

export default changePassword;
