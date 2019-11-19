import React, { useState, useEffect } from 'react';
import {
  initialize,
  move,
  pickupTreasure,
  dropTreasure,
  sellTreasure,
  confirmSellTreasure
} from '../endpointCalls';
import PlayerActions from './PlayerActions';

const Room = () => {
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
  const [roomId, setRoomId] = useState('');
  const [itemChange, setItemChange] = useState({ nameOfItem: '' });

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

  const onMoveButton = direction => {
    let moveObject = { direction };
    if (roomId) {
      moveObject['next_room_id'] = roomId;
    }
    move(moveObject)
      .then(res => {
        changeRoomInfo(res.data);
      })
      .catch(err => console.log(err));
  };

  const changeRoomInfo = roomData => {
    const exits = JSON.stringify(roomData.exits);
    const messages = JSON.stringify(roomData.messages);
    const players = JSON.stringify(roomData.players);
    const errors = JSON.stringify(roomData.errors);
    setRoomInfo({ ...roomData, exits, messages, players, errors });
    setRoomCooldown(Math.round(roomData.cooldown));
    setRoomId('');
  };

  const onRoomIdChange = event => {
    setRoomId(event.target.value);
  };

  const onItemChange = event => {
    setItemChange({ [event.target.name]: event.target.value });
  };

  const submitItemPickup = e => {
    e.preventDefault();
    pickupTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setRoomCooldown(Math.round(res.data.cooldown));
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  const submitDropItem = e => {
    e.preventDefault();
    dropTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setRoomCooldown(Math.round(res.data.cooldown));
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  const submitSellItem = e => {
    e.preventDefault();
    sellTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setRoomCooldown(Math.round(res.data.cooldown));
      })
      .catch(err => console.log(err));
  };

  const submitConfirmSellItem = event => {
    event.preventDefault();
    confirmSellTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setRoomCooldown(Math.round(res.data.cooldown));
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div>
        <div>
          <h3>Room Status</h3>
          <p>Title: {roomInfo.title}</p>
          <p>Description: {roomInfo.description}</p>
          <p>Coordinates: {roomInfo.coordinates}</p>
          <p>Room ID: {roomInfo.room_id}</p>
          <p>Exits: {roomInfo.exits}</p>
          <p>
            Items:{' '}
            {roomInfo.items &&
              roomInfo.items.map(item => (
                <button
                  name='nameOfItem'
                  value={item}
                  onClick={event => onItemChange(event)}
                  disabled={roomCooldown}
                >
                  {item}
                </button>
              ))}
          </p>
          <form onSubmit={submitItemPickup}>
            <input
              type='text'
              name='nameOfItem'
              placeholder='Add or drop items here'
              onChange={onItemChange}
              value={itemChange.nameOfItem}
              disabled={roomCooldown}
            />
            <button
              onClick={event => submitItemPickup(event)}
              disabled={roomCooldown}
            >
              Get Item
            </button>
            <button
              onClick={event => submitDropItem(event)}
              disabled={roomCooldown}
            >
              Drop Item
            </button>
            <button
              onClick={event => submitSellItem(event)}
              disabled={roomCooldown}
            >
              Sell Item
            </button>
            <button
              onClick={event => submitConfirmSellItem(event)}
              disabled={roomCooldown}
            >
              Confirm Sell Item
            </button>
          </form>
          <p>Players: {roomInfo.players}</p>
          <p>Messages: {roomInfo.messages}</p>
          <p>Errors: {roomInfo.errors}</p>
        </div>
        <div>
          <h3>Move Buttons</h3>
          <input
            name='roomId'
            placeholder='If you know the Room ID, input here!'
            onChange={onRoomIdChange}
            value={roomId}
            disabled={roomCooldown}
          />
          <button
            type='button'
            onClick={() => onMoveButton('n')}
            disabled={roomCooldown}
          >
            Up
          </button>
          <button
            type='button'
            onClick={() => onMoveButton('s')}
            disabled={roomCooldown}
          >
            Down
          </button>
          <button
            type='button'
            onClick={() => onMoveButton('w')}
            disabled={roomCooldown}
          >
            Left
          </button>
          <button
            type='button'
            onClick={() => onMoveButton('e')}
            disabled={roomCooldown}
          >
            Right
          </button>
          <h5>Move Cooldown</h5>
          <p>{roomCooldown}</p>
        </div>
      </div>
      <PlayerActions
        changeRoomInfo={changeRoomInfo}
        setRoomCooldown={setRoomCooldown}
        roomCooldown={roomCooldown}
      />
    </>
  );
};

export default Room;
