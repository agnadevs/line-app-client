import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import { InfoBox } from "./InfoBox";

const CLIENT_ID =
  "627288097347-5a68p3saa38s53fqmmllk8773odutoc2.apps.googleusercontent.com";

type Info = {
  text: string;
  isError: boolean;
};

const LoginBtn: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<Info>({ isError: false, text: "" });

  const history = useHistory();

  const login = async (response: any) => {
    await fetch("http://localhost:4000/api/login", {
      method: "POST",
      body: JSON.stringify({ accessToken: response.tokenId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        if (res.err) {
          setError({
            isError: true,
            text: "Something went wrong! Try again",
          });
        }
        Cookies.set("user", res.data, { expires: 7 });
        setIsLoggedIn(true);
        history.push("/menu");
      })
      .catch((err) =>
        setError({ isError: true, text: "Something went wrong! Try again" })
      );
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const handleLoginFailure = () => {
    alert("Failed to log in");
  };

  const handleLogoutFailure = () => {
    alert("Failed to log out");
  };

  return (
    <div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId={CLIENT_ID}
          buttonText="Sign out"
          onLogoutSuccess={logout}
          onFailure={handleLogoutFailure}
        />
      ) : (
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Sign in with Google"
          onSuccess={login}
          onFailure={handleLoginFailure}
          cookiePolicy={"single_host_origin"}
          responseType="code,token"
        />
      )}
      {error.isError && <InfoBox {...error} />}
    </div>
  );
};

export default LoginBtn;
