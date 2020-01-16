import React from "react";

// import Material UI
import { Grid } from "@material-ui/core";

// import components
import Slogans from "../../organisms/Introduction/Slogans/Slogans";
import SignIn from "../../organisms/Introduction/SignIn/SignIn";

const IntroLayout = props => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item lg={6}>
          <Slogans />
        </Grid>
        <Grid item lg={6}>
          <SignIn />
          {props.children}
        </Grid>
      </Grid>
    </>
  );
};

export default IntroLayout;
