import { toast } from "react-toastify";

export const failureToast = (message = "Failed") => {
  toast.error(message, { theme: "colored" });
};

export const infoToast = (message = "Information") => {
  toast.info(message, { theme: "colored" });
};
