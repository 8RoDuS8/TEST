import { request } from "./requests";

const url = "api/passwordStrength";

type ResponseType = { strength: validator.default.strongPasswordOptions };

const getPasswordStrength = () =>
  async (onSuccess: (strength: validator.default.strongPasswordOptions) => void, onError: (error: string) => void) => {
    try {
      const response = await request<ResponseType>("GET", url);
      if (!response.success) return onError(response.error ?? "Get Password Strength Error");
      return onSuccess(response.data.strength);
    } catch (e) {
      onError("Get Password Strength Error");
    }
  };

export default getPasswordStrength;
