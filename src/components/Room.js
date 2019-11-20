import React, { useState } from 'react';
import {
  move,
  pickupTreasure,
  dropTreasure,
  sellTreasure,
  confirmSellTreasure,
  dashToRoom
} from '../endpointCalls';
import PlayerActions from './PlayerActions';

const Room = ({ roomInfo, roomCooldown, setRoomCooldown, changeRoomInfo }) => {
  const [roomId, setRoomId] = useState('');
  const [itemChange, setItemChange] = useState({ nameOfItem: '' });
  const [dashPath, setDashPath] = useState('');

  const onMoveButton = direction => {
    let moveObject = { direction };
    if (roomId) {
      moveObject['next_room_id'] = roomId;
    }
    move(moveObject)
      .then(res => {
        changeRoomInfo(res.data);
        setRoomId('');
      })
      .catch(err => console.log(err));
  };

  const onRoomIdChange = event => {
    setRoomId(event.target.value);
  };

  const onItemChange = event => {
    setItemChange({ [event.target.name]: event.target.value });
  };

  const submitItemPickup = (e, item = '') => {
    e.preventDefault();
    let pickUpThisItem;
    if (item) {
      pickUpThisItem = e.target.value;
    } else {
      pickUpThisItem = itemChange.nameOfItem;
    }
    pickupTreasure(pickUpThisItem)
      .then(res => {
        changeRoomInfo(res.data);
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  const submitDropItem = e => {
    e.preventDefault();
    dropTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  const submitSellItem = e => {
    e.preventDefault();
    sellTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
      })
      .catch(err => console.log(err));
  };

  const submitConfirmSellItem = event => {
    event.preventDefault();
    confirmSellTreasure(itemChange.nameOfItem)
      .then(res => {
        changeRoomInfo(res.data);
        setItemChange({ ...itemChange, nameOfItem: '' });
      })
      .catch(err => console.log(err));
  };

  const dashPathInputChange = event => {
    setDashPath(event.target.value);
  };

  const submitDashPath = event => {
    event.preventDefault();
    dashToRoom({ room_path: dashPath, direction: roomId })
      .then(res => {
        changeRoomInfo(res);
        setRoomId('');
        setDashPath('');
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
                  onClick={event => submitItemPickup(event, true)}
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
          <p>Elevation: {roomInfo.elevation}</p>
          <p>Terrain: {roomInfo.terrain}</p>
          <p>Players: {roomInfo.players}</p>
          <p>Messages: {roomInfo.messages}</p>
          <p>Errors: {roomInfo.errors}</p>
        </div>
        <div>
          <h3>Move Buttons</h3>
          <div>
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
          </div>
          <form onSubmit={event => submitDashPath(event)}>
            <input
              type='text'
              placeholder='Type in path you want to traverse, i.e. 101,9,8,6'
              value={dashPath}
              onChange={event => dashPathInputChange(event)}
              disabled
            />
            <button type='submit' onClick={event => submitDashPath(event)} disabled>
              Dash!
            </button>
          </form>
          <div>
            <h5>Move Cooldown</h5>
            <p>{roomCooldown}</p>
          </div>
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
