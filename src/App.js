import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ToastContainer } from "react-toastify";
import ROUTES, { RenderRoutes } from "./routes/routes";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <RenderRoutes routes={ROUTES} />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;


