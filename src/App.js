import React from "react";
import { Provider } from "react-redux";

import RouterPage from "./Routers";
import store from "./Store";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <div className="App">
        <RouterPage />
      </div>
      <ToastContainer />
    </Provider>
  );
}

export default App;
