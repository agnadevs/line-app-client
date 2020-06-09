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
}

type Data = {
  name: string;
};
