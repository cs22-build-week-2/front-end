import React, { useState, useEffect } from "react";
import { initialize, move } from "../endpointCalls";
import PlayerActions from "./PlayerActions";

const Room = () => {
  const roomState = {
    room_id: 0,
    title: "",
    description: "",
    coordinates: "",
    exits: [],
    cooldown: 0,
    errors: [],
    messages: []
  };

  const [roomCooldown, setRoomCooldown] = useState(0);
  const [roomInfo, setRoomInfo] = useState(roomState);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    initialize()
      .then(res => {
        let room_id = res.data.room_id;
        let title = res.data.title;
        let description = res.data.description;
        let coordinates = res.data.coordinates;
        let exits = res.data.exits;
        let room_cooldown = res.data.roomCooldown;
        let errors = res.data.errors;
        let messages = res.data.messages;

        setRoomInfo({
          room_id: room_id,
          title: title,
          description: description,
          coordinates: coordinates,
          exits: JSON.stringify(exits),
          roomCooldown: room_cooldown,
          errors: errors,
          messages: messages
        });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const timer = setTimeout(function() {
      if (roomCooldown > 0) {
        setRoomCooldown(roomCooldown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [roomCooldown]);

  const onMoveButton = direction => {
    let moveObject = { direction };
    if (roomId) {
      moveObject["next_room_id"] = roomId;
    }
    move(moveObject)
      .then(res => changeRoomInfo(res.data))
      .catch(err => console.log(err));
  };

  const changeRoomInfo = roomData => {
    const exits = JSON.stringify(roomData.exits);
    const items = JSON.stringify(roomData.items);
    const messages = JSON.stringify(roomData.messages);
    const players = JSON.stringify(roomData.players);
    const errors = JSON.stringify(roomData.errors);
    setRoomInfo({ ...roomData, exits, items, messages, players, errors });
    setRoomCooldown(Math.round(roomData.cooldown));
    setRoomId("");
  };

  const onRoomIdChange = event => {
    setRoomId(event.target.value);
  };

  return (
    <>
      <div>
        <h3>Room Status</h3>
        <p>Title: {roomInfo.title}</p>
        <p>Description: {roomInfo.description}</p>
        <p>Coordinates: {roomInfo.coordinates}</p>
        <p>Room ID: {roomInfo.room_id}</p>
        <p>Exits: {roomInfo.exits}</p>
        <p>Items: {roomInfo.items}</p>
        <p>Messages: {roomInfo.messages}</p>
        <p>Players: {roomInfo.players}</p>
        <p>Elevation: {roomInfo.elevation}</p>
        <p>Terrain: {roomInfo.terrain}</p>
        <p>Errors: {roomInfo.errors}</p>
      </div>
      <div>
        <h3>Move Buttons</h3>
        <input
          name="roomId"
          placeholder="If you know the Room ID, input here!"
          onChange={onRoomIdChange}
          value={roomId}
          disabled={roomCooldown}
        />
        <button
          type="button"
          onClick={() => onMoveButton("n")}
          disabled={roomCooldown}
        >
          Up
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("s")}
          disabled={roomCooldown}
        >
          Down
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("w")}
          disabled={roomCooldown}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("e")}
          disabled={roomCooldown}
        >
          Right
        </button>
        <h5>Move Cooldown</h5>
        <p>{roomCooldown}</p>
      </div>
      <PlayerActions changeRoomInfo={changeRoomInfo}/>
    </>
  );
};

export default Room;
