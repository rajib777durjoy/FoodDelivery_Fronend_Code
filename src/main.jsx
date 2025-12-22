import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import AuthProvider from "./Public/Provider/AuthProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <AuthProvider>
      <App />
      <ToastContainer position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce} />
    </AuthProvider>
  </BrowserRouter >,
)
