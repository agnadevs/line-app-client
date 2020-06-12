import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";
import { authContext } from "../../state/authContext";

export interface LoggedInRouteProps extends RouteProps {}

export const LoggedInRoute: React.FC<LoggedInRouteProps> = (props) => {
  const { authState } = useContext(authContext);

  if (authState.isLoggedIn) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

// type IProps = {
//   exact?: boolean;
//   path: string;
//   component: React.ComponentType<any>;
// };
// export const LoggedInRoute = ({
//   component: Component,
//   ...otherProps
// }: IProps) => {
//   return (
//     <>
//       <Route
//         render={(otherProps) =>
//           !!Cookies.get("user") ? (
//             <Component {...otherProps} />
//           ) : (
//             <Redirect to="/" />
//           )
//         }
//       />
//     </>
//   );
// };
