export type ChatMessage = {
  text: string;
  userName: string;
  userId: string;
  timestamp: string;
};

export type User = {
  userName: string;
  userId: string;
  createdAt: string;
  socketId: string;
};

type Data = {
  name: string;
};

export type Room = {
  title: string;
  infoText: string;
  imgURL?: string;
  onClick?: () => void;
  path: string;
};
