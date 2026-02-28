import toast from "react-hot-toast";

export const toastSuccess = (message: string) =>
  toast.success(message);

export const toastError = (message: string) =>
  toast.error(message);

export const toastLoading = (message: string) =>
  toast.loading(message);