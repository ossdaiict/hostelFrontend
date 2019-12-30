import React from "react";
import { Provider } from "react-redux";

import RouterPage from "./Routers";
import store from "./Store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <RouterPage />
      </div>
    </Provider>
  );
}

export default App;
