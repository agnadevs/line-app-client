import React, { useState, useContext } from "react";
import { RoomsContext } from "../../state/roomsContext";
import { UserContext } from "../../state/userContext";

export const NewRoom = () => {
  const { rooms, addNewRoom } = useContext(RoomsContext);
  const { user } = useContext(UserContext);
  const [roomName, setRoomName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (roomName === "") {
      console.log("Type a name please!");
    }
    fetch("http://localhost:4000/api/rooms/private", {
      method: "POST",
      body: JSON.stringify({ userId: user.userId, roomName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => addNewRoom(res.data));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleNameChange}
          value={roomName}
          type="text"
          placeholder="Room name"
        />
        <button>Create room</button>
      </form>
    </div>
  );
};
