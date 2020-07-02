import React, { useContext } from "react";
import { DesktopMenu } from "./DesktopMenu";
import { RoomsContext } from "../../../state/roomsContext";
import { RoomsList } from "./RoomsList";

type Props = {
  highlight?: boolean;
};

export const RoomsMenu: React.FC<Props> = () => {
  const { rooms } = useContext(RoomsContext);

  if (rooms.length === 0) return null;

  return (
    <DesktopMenu title="ROOMS" type="rooms">
      <RoomsList rooms={rooms} />
    </DesktopMenu>
  );
};
