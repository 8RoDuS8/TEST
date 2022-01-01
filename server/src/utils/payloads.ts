export const jsonPayload = (success: boolean, payload: any) => ({ success, [success ? "data" : "error"]: payload });


export const notFound = jsonPayload(false, "Page Not Found");

export const unautherized = jsonPayload(false, "Unautherized");

export const internalServerError = jsonPayload(false, "Internal Server Error");