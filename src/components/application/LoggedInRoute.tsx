import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import Cookies from "js-cookie";

export interface LoggedInRouteProps extends RouteProps {}

export const LoggedInRoute: React.FC<LoggedInRouteProps> = (props) => {
  const isAuthenticated = !!Cookies.get("user");

  if (isAuthenticated) {
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
