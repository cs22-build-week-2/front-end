import React, { useState } from "react";
import {
  checkItemOrPlayer,
  wearEquipment,
  unwearEquipment
} from "../endpointCalls";
import ItemOrPlayerStatus from "./ItemOrPlayerStatus";

const PlayerActions = ({ setRoomCooldown, roomCooldown }) => {
  const [itemOrPlayer, setItemOrPlayer] = useState("");
  const [wearEquipmentS, setWearEquipment] = useState("");
  const [unwearEquipmentS, setUnwearEquipment] = useState("");
  const [itemOrPlayerData, setItemOrPlayerData] = useState({
    attributes: "",
    description: "",
    exp: "",
    itemtype: "",
    level: "",
    name: "",
    weight: "",
    errors: "",
    messages: "",
    cooldown: ""
  });

  const onItemOrPlayerChange = event => {
    setItemOrPlayer(event.target.value);
  };

  const onWearEquipmentChange = event => {
    setWearEquipment(event.target.value);
  };

  const onUnwearEquipmentChange = event => {
    setUnwearEquipment(event.target.value);
  };

  const submitItemOrPlayer = event => {
    event.preventDefault();
    checkItemOrPlayer({ name: itemOrPlayer })
      .then(res => {
        const errors = JSON.stringify(res.data.errors);
        const messages = JSON.stringify(res.data.messages);
        setItemOrPlayerData({ ...res.data, errors, messages });
        setRoomCooldown(Math.round(res.data.cooldown));
        setItemOrPlayer("");
      })
      .catch(err => console.log(err));
  };

  const submitWearEquipment = event => {
    event.preventDefault();
    wearEquipment({ name: wearEquipmentS })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  const submitUnwearEquipment = event => {
    event.preventDefault();
    unwearEquipment({ name: unwearEquipmentS })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <>
      <form>
        <input
          name="itemOrPlayer"
          placeholder="Check Item or Player"
          onChange={onItemOrPlayerChange}
          value={itemOrPlayer}
          disabled={roomCooldown}
        />
        <button
          type="submit"
          onClick={event => submitItemOrPlayer(event)}
          disabled={roomCooldown}
        >
          Check Item or Player
        </button>
      </form>
      <form>
        <input
          name="wearEquipment"
          placeholder="Type Equipment to wear"
          onChange={onWearEquipmentChange}
          value={wearEquipmentS}
          disabled={roomCooldown}
        />
        <button
          type="submit"
          onClick={event => submitWearEquipment(event)}
          disabled={roomCooldown}
        >
          Wear Equipment
        </button>
      </form>
      <form>
        <input
          name="unwearEquipment"
          placeholder="Type Equipment to take off"
          onChange={onUnwearEquipmentChange}
          value={unwearEquipmentS}
          disabled={roomCooldown}
        />
        <button
          type="submit"
          onClick={event => submitUnwearEquipment(event)}
          disabled={roomCooldown}
        >
          Take Off Equipment
        </button>
      </form>
      <ItemOrPlayerStatus data={itemOrPlayerData} />
    </>
  );
};

export default PlayerActions;
