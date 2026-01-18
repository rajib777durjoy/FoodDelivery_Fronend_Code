import React from 'react';
import { Bounce, toast } from 'react-toastify';

const ToastSuccess = (message) => {
   return toast.success(message, {
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

export default ToastSuccess;