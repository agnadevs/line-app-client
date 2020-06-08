import Cookies from 'js-cookie';
const userCookie = Cookies.get('user')

const colors: string[] = [
  "#d5dcf9",
  "#caffb9",
  "#a8ccc9",
  "#a4b8c4",
  "#daf7dc",
];

const checkAndSetUserContext = (currentUser: any, setCurrentUser: any) => {
  if(!currentUser.userName){
    if (userCookie) {
      const parsedUser = JSON.parse(userCookie);
      setCurrentUser({
        userName: parsedUser.userName,
        userId: parsedUser.userId,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    } else {
      window.location.href = '/'
    }
  }
}

export {checkAndSetUserContext}

