import React, { useState, useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import { InfoBox } from "./InfoBox";
import { AuthContext } from "../../state/authContext";
import { UserContext } from "../../state/userContext";
import { User } from "../../types";
import { postAccessToken } from "../../api";

type Info = {
  text: string;
  isError: boolean;
};

const LoginBtn: React.FC = () => {
  const { isLoggedIn, isUserLoggedIn } = useContext(AuthContext);
  const { removeUser } = useContext(UserContext);

  const [error, setError] = useState<Info>({ isError: false, text: "" });

  const history = useHistory();
  const CLIENT_ID =
    "627288097347-5a68p3saa38s53fqmmllk8773odutoc2.apps.googleusercontent.com";

  const onTokenVerified = (data: User, error: any) => {
    if (error) {
      setError({
        isError: true,
        text: "Something went wrong! Try again",
      });
    }
    Cookies.set("user", data, { expires: 7 });
    isUserLoggedIn(true);
    history.push("/lounge");
  };

  const login = async (response: any) => {
    const body = JSON.stringify({ accessToken: response.tokenId });

    await postAccessToken(body, onTokenVerified).catch((err) =>
      setError({ isError: true, text: "Something went wrong! Try again" })
    );
  };

  const logout = () => {
    Cookies.remove("user");
    removeUser();
    isUserLoggedIn(false);
    history.push("/");
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
