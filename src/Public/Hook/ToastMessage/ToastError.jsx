import React from 'react';
import { Bounce, toast } from 'react-toastify';

const ToastError = (message) => {
   return toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
};

export default ToastError;