import React from 'react'
// import { GoogleLogout } from "react-google-login";

const client_id =
  "216704398302-adt18t71erlvf07dl13okgeeotqfgeuo.apps.googleusercontent.com";
export const Test2 = () => {
  return (
    <div>
        <GoogleLogout
            clientId={client_id}
            buttonText="Logout"
            onLogoutSuccess={() => alert("You have been logged out successfully")}
        />
    </div>
  )
}
