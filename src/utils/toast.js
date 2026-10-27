import { toast } from 'react-toastify';

const options = { position: 'top-right', autoClose: 4000 };

export const notifySuccess = (message) => toast.success(message || 'Success!', options);
export const notifyError = (message) => toast.error(message || 'Something went wrong', options);
