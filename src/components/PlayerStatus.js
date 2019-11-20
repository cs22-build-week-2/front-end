import React, { useState, useEffect } from 'react';
import {
  checkStatus,
  confirmSellTreasure,
  giveGhostItem,
  takeGhostItem
} from '../endpointCalls';

const PlayerStatus = ({ changeRoomInfo }) => {
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
    messages: []
  };
  const [playerStatus, setPlayerStatus] = useState(playerState);
  const [playerCooldown, setPlayerCooldown] = useState(0);
  const [actionState, setActionState] = useState(true);
  const [ghostItem, setGhostItem] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('ghost')) {
      setGhostItem(localStorage.getItem('ghost'));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(function() {
      if (playerCooldown > 0) {
        setPlayerCooldown(playerCooldown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [playerCooldown]);

  const onRefreshPlayerStatus = () => {
    checkStatus()
      .then(res => {
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
          status: JSON.stringify(status),
          errors: JSON.stringify(errors),
          messages: JSON.stringify(messages)
        });
        setPlayerCooldown(cooldown);
      })
      .catch(err => console.log(err));
  };

  const submitConfirmSellItem = event => {
    event.preventDefault();
    confirmSellTreasure(event.target.value)
      .then(res => changeRoomInfo(res.data))
      .catch(err => console.log(err));
  };

  const clickGiveGhostItem = event => {
    giveGhostItem(event.target.value)
      .then(res => {
        changeRoomInfo(res.data);
        setGhostItem(true);
        localStorage.setItem('ghost', true);
      })
      .catch(err => console.log(err));
  };

  const clickTakeGhostItem = () => {
    takeGhostItem()
      .then(res => {
        changeRoomInfo(res.data);
        setGhostItem(false);
        localStorage.setItem('ghost', false);
      })
      .catch(err => console.log(err));
  };

  const buttonStyles = {
    backgroundColor: 'grey'
  };

  return (
    <>
      <div>
        <h3>Player Status/Inventory</h3>
        <button
          type='button'
          onClick={onRefreshPlayerStatus}
          disabled={playerCooldown}
        >
          Refresh Player Status
        </button>
        <button
          type='button'
          onClick={() => setActionState(true)}
          style={actionState ? buttonStyles : null}
        >
          Sell Items
        </button>
        <button
          type='button'
          onClick={() => setActionState(false)}
          style={actionState ? null : buttonStyles}
        >
          Interact With Ghost
        </button>
        <button
          type='button'
          onClick={clickTakeGhostItem}
          disabled={!ghostItem}
        >
          Take Item from Ghost
        </button>
        <p>Name: {playerStatus.name}</p>
        <p>Cooldown: {playerStatus.cooldown}</p>
        <p>Encumbrance: {playerStatus.encumbrance}</p>
        <p>Strength: {playerStatus.strength}</p>
        <p>Speed: {playerStatus.speed}</p>
        <p>Gold: {playerStatus.gold}</p>
        <p>Bodywear: {playerStatus.bodywear}</p>
        <p>Footwear: {playerStatus.footwear}</p>
        <p>
          Inventory:{' '}
          {playerStatus.inventory.map(item => (
            <button
              type='button'
              value={item}
              onClick={event => {
                actionState
                  ? submitConfirmSellItem(event)
                  : clickGiveGhostItem(event);
              }}
              disabled={playerCooldown}
            >
              {item}
            </button>
          ))}
        </p>
        <h5>Player Cooldown</h5>
        <p>{playerCooldown}</p>
      </div>
    </>
  );
};

export default PlayerStatus;
