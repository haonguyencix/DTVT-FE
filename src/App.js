import React from "react";
import { ToastContainer } from "react-toastify";
import ROUTES, { RenderRoutes } from "./routes/routes";

function App() {
  return (
    <React.Fragment>
      <RenderRoutes routes={ROUTES} />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;


