import React, { useState } from "react";
import {
  checkItemOrPlayer,
  wearEquipment,
  unwearEquipment,
  pickupTreasure
} from "../endpointCalls";

const PlayerActions = () => {
  const [itemOrPlayer, setItemOrPlayer] = useState("");
  const [wearEquipmentS, setWearEquipment] = useState("");
  const [unwearEquipmentS, setUnwearEquipment] = useState("");

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
      .then(res => console.log(res))
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

  const submitPickupTreasure = event => {
    event.preventDefault();
    pickupTreasure({ name: itemOrPlayer })
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
        />
        <button type="submit" onClick={event => submitItemOrPlayer(event)}>
          Check Item or Player
        </button>
        <button type="submit" onClick={event => submitPickupTreasure(event)}>
          Pick Up Treasure
        </button>
      </form>
      <form>
        <input
          name="wearEquipment"
          placeholder="Type Equipment to wear"
          onChange={onWearEquipmentChange}
          value={wearEquipmentS}
        />
        <button type="submit" onClick={event => submitWearEquipment(event)}>
          Wear Equipment
        </button>
      </form>
      <form>
        <input
          name="unwearEquipment"
          placeholder="Type Equipment to take off"
          onChange={onUnwearEquipmentChange}
          value={unwearEquipmentS}
        />
        <button type="submit" onClick={event => submitUnwearEquipment(event)}>
          Take Off Equipment
        </button>
      </form>
    </>
  );
};

export default PlayerActions;
