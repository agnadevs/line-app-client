import React from "react";
import { ChatMessage } from "../types";

type Props = {
  messages: ChatMessage[];
};

export const MessagesList: React.FC<Props> = ({ messages }) => {
  return (
    <div>
      {!!messages.length
        ? messages.map((message: ChatMessage, index: number) => {
            return (
              <div key={index}>
                <p>
                  <strong>{message.name}</strong>
                </p>
                <p>{message.text}</p>
              </div>
            );
          })
        : null}
    </div>
  );
};
