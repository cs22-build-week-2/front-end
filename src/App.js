import React, { useState, useEffect } from 'react';
import Room from './components/Room';
import ApiKey from './components/ApiKey';
import PlayerStatus from './components/PlayerStatus';
import Mine from './components/Mine';
import { initialize } from './endpointCalls';

function App() {
  const roomState = {
    room_id: 0,
    title: '',
    description: '',
    coordinates: '',
    exits: [],
    cooldown: 0,
    errors: [],
    messages: [],
    items: [],
    players: []
  };

  const [roomCooldown, setRoomCooldown] = useState(0);
  const [roomInfo, setRoomInfo] = useState(roomState);

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
          errors: JSON.stringify(errors),
          messages: JSON.stringify(messages)
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

  const changeRoomInfo = roomData => {
    const exits = JSON.stringify(roomData.exits);
    const messages = JSON.stringify(roomData.messages);
    const players = JSON.stringify(roomData.players);
    const errors = JSON.stringify(roomData.errors);
    setRoomInfo({ ...roomData, exits, messages, players, errors });
    setRoomCooldown(Math.round(roomData.cooldown));
  };

  return (
    <div>
      <ApiKey />
      <Room
        roomInfo={roomInfo}
        roomCooldown={roomCooldown}
        setRoomCooldown={setRoomCooldown}
        changeRoomInfo={changeRoomInfo}
      />
      <PlayerStatus changeRoomInfo={changeRoomInfo} />
      <Mine />
    </div>
  );
}

export default App;
