import React from "react";
import { GoogleLogin } from "react-google-login";
const client_id =
  "216704398302-adt18t71erlvf07dl13okgeeotqfgeuo.apps.googleusercontent.com";
export const Testing = () => {
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("Login Failed: res:", res);
  };
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={client_id}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};
