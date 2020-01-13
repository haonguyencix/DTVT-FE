import React from "react";

// import screens
import IntroScreen from "../../screens/pages/Introduction/IntroScreen/IntroScreen";
import SignUpScreen from "../../screens/pages/Introduction/SignUpScreen/SignUpScreen";

export const introRouteArr = [
    { path: "/student-signup", main: () => <SignUpScreen /> },
    { path: "/", main: () => <IntroScreen /> },
]
