import React, { useState, useEffect } from "react";
import { RoomsMenu } from "./RoomsMenu";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";
import { User, Room } from "../../../types";

type Props = {
  currentRoom: Room;
  activeUsers: User[];
};
export const MenuSwitch: React.FC<Props> = ({ currentRoom, activeUsers }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 450);

  const updateMedia = () => {
    setIsMobile(window.innerWidth < 450);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      {isMobile ? (
        <MobileMenu currentRoom={currentRoom!} activeUsers={activeUsers} />
      ) : (
        <>
          <UserMenu currentRoom={currentRoom!} activeUsers={activeUsers} />
          <RoomsMenu />
        </>
      )}
    </>
  );
};
