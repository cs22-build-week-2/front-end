import React, { useState, useEffect } from 'react';
import { initialize, move, checkStatus } from './endpointCalls';

function App() {
  const playerState = {
    name: '',
    cooldown: 0,
    encumbrance: 0,
    strength: 0,
    speed: 0,
    gold: 0,
    bodywear: '',
    footwear: '',
    inventory: [],
    status: [],
    errors: [],
    messages: [],
  };

  const roomState = {
    room_id: 0,
    title: '',
    description: '',
    coordinates: '',
    exits: [],
    cooldown: 0,
    errors: [],
    messages: [],
  };

  const [key, setKey] = useState('');
  const [currentApiKey, setCurrentApiKey] = useState('');
  const [playerStatus, setPlayerStatus] = useState(playerState);
  const [cooldown, setCooldown] = useState(0);
  const [roomInfo, setRoomInfo] = useState(roomState);

  useEffect(() => {
    initialize()
      .then(res => {
        let room_id = res.data.room_id;
        let title = res.data.title;
        let description = res.data.description;
        let coordinates = res.data.coordinates;
        let exits = res.data.exits;
        let room_cooldown = res.data.cooldown;
        let errors = res.data.errors;
        let messages = res.data.messages;

        setRoomInfo({
          room_id: room_id,
          title: title,
          description: description,
          coordinates: coordinates,
          exits: exits,
          cooldown: room_cooldown,
          errors: errors,
          messages: messages,
        });
      })
      .catch(err => console.log(err));

    checkStatus()
      .then(res => {
        console.log('playerstatus', res.data);
        let playerName = res.data.name;
        let cooldown = res.data.cooldown;
        let encumbrance = res.data.encumbrance;
        let strength = res.data.strength;
        let speed = res.data.speed;
        let gold = res.data.gold;
        let bodywear = res.data.bodywear;
        let footwear = res.data.footwear;
        let inventory = res.data.inventory;
        let status = res.data.status;
        let errors = res.data.errors;
        let messages = res.data.messages;

        setPlayerStatus({
          name: playerName,
          cooldown: cooldown,
          encumbrance: encumbrance,
          strength: strength,
          speed: speed,
          gold: gold,
          bodywear: bodywear,
          footwear: footwear,
          inventory: inventory,
          status: status,
          errors: errors,
          messages: messages,
        });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setCurrentApiKey(localStorage.getItem('token'));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(function() {
      if (cooldown > 0) {
        setCooldown(cooldown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const onApiKeyChange = event => {
    setKey(event.target.value);
  };

  const onApiKeySubmit = event => {
    event.preventDefault();
    localStorage.setItem('token', key);
    setCurrentApiKey(key);
  };

  const onMoveButton = direction => {
    move({ direction })
      .then(res => {
        setPlayerStatus(res.data);
        setCooldown(res.data.cooldown);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='App'>
      <form onSubmit={event => onApiKeySubmit(event)}>
        <label htmlFor='token'>Input your API Key here!</label>
        <input
          name='token'
          placeholder='Type in your api key'
          onChange={event => onApiKeyChange(event)}
          value={key}
        />
        <button type='submit'>Set Api Key</button>
      </form>
      <div>
        <h4>Current Api Key</h4>
        <p>{currentApiKey}</p>
      </div>
      <div>
        <h3>Player Status(room status??)</h3>
        <p>Title: {roomInfo.title}</p>
        <p>Description: {roomInfo.description}</p>
        <p>Coordinates: {roomInfo.coordinates}</p>
        <p>Room ID: {roomInfo.room_id}</p>
        <p>Exits: {roomInfo.exits}</p>
        <p>Items: {roomInfo.items}</p>
      </div>
      <div>
        <h3>Player Status/Inventory</h3>
        <p>Name: {playerStatus.name}</p>
        <p>Cooldown: {playerStatus.cooldown}</p>
        <p>Encumbrance: {playerStatus.encumbrance}</p>
        <p>Strength: {playerStatus.strength}</p>
        <p>Speed: {playerStatus.speed}</p>
        <p>Gold: {playerStatus.gold}</p>
        <p>Bodywear: {playerStatus.bodywear}</p>
        <p>Footwear: {playerStatus.footwear}</p>
        <p>Inventory: {playerStatus.inventory}</p>
      </div>
      <div>
        <h3>Move Buttoms</h3>
        <button
          type='button'
          onClick={() => onMoveButton('n')}
          disabled={cooldown}>
          Up
        </button>
        <button
          type='button'
          onClick={() => onMoveButton('s')}
          disabled={cooldown}>
          Down
        </button>
        <button
          type='button'
          onClick={() => onMoveButton('w')}
          disabled={cooldown}>
          Left
        </button>
        <button
          type='button'
          onClick={() => onMoveButton('e')}
          disabled={cooldown}>
          Right
        </button>
        <h5>Move Cooldown</h5>
        <p>{cooldown}</p>
      </div>
    </div>
  );
}

export default App;
