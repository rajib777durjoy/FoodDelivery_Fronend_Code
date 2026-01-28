import { BrowserRouter } from "react-router";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Public/Provider/AuthProvider.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "./Redux/store.js";

import { PersistGate } from "redux-persist/integration/react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </AuthProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

