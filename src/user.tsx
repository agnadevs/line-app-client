import Cookies from "js-cookie";

const colors: string[] = [
  "#d5dcf9",
  "#caffb9",
  "#a8ccc9",
  "#a4b8c4",
  "#daf7dc",
];

const checkAndSetUserContext = (user: any, dispatch: any) => {
  const userCookie = Cookies.get("user");
  if (!user.userName) {
    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);
      dispatch({
        type: "SET_USER",
        data: {
          userName: parsedUser.userName,
          userId: parsedUser.userId,
          profileImageURL: parsedUser.profileImageURL,
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      });
    } else {
      window.location.href = "/";
    }
  }
};

export { checkAndSetUserContext };
