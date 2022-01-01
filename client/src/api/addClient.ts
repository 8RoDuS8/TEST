import { protectedRequest } from "./requests";

const url = "api/clients";

type ResponseType = { token: string };

type AddClientBody = {
  fullname: string;
  dob: string;
  email: string;
  phoneNumber: string;
  address: string;
}


const addClient =
  (body: AddClientBody) =>
    async (onSuccess: () => void, onError: (error: string) => void) => {
      try {
        const response = await protectedRequest<ResponseType>("POST", url, body);
        if (!response.success) return onError(response.error ?? "Internal Error");
        // TODO: return success data.
        return onSuccess();
      } catch (e) {
        onError("Internal Error");
      }
    };

export default addClient;
