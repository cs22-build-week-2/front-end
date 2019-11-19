import React, { useState, useEffect } from "react";
import { initialize, move } from "./endpointCalls";

function App() {
  const [key, setKey] = useState("");
  const [currentApiKey, setCurrentApiKey] = useState("");
  const [playerStatus, setPlayerStatus] = useState({});
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    initialize()
      .then(res => {
        setPlayerStatus(res.data)
        setCooldown(res.data.cooldown)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setCurrentApiKey(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(function() {
      if (cooldown > 0) {
        setCooldown(cooldown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer)
  }, [cooldown]);

  const onApiKeyChange = event => {
    setKey(event.target.value);
  };

  const onApiKeySubmit = event => {
    event.preventDefault();
    localStorage.setItem("token", key);
    setCurrentApiKey(key);
  };

  const onMoveButton = direction => {
    move({ direction })
      .then(res => {
        setPlayerStatus(res.data)
        setCooldown(res.data.cooldown)
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <form onSubmit={event => onApiKeySubmit(event)}>
        <label htmlFor="token">Input your API Key here!</label>
        <input
          name="token"
          placeholder="Type in your api key"
          onChange={event => onApiKeyChange(event)}
          value={key}
        />
        <button type="submit">Set Api Key</button>
      </form>
      <div>
        <h4>Current Api Key</h4>
        <p>{currentApiKey}</p>
      </div>
      <div>
        <h3>Player Status</h3>
        <p>Title: {playerStatus.title}</p>
        <p>Description: {playerStatus.description}</p>
        <p>Coordinates: {playerStatus.coordinates}</p>
        <p>Room ID: {playerStatus.room_id}</p>
        <p>Exits: {playerStatus.exits}</p>
        <p>Items: {playerStatus.items}</p>
      </div>
      <div>
        <h3>Move Buttoms</h3>
        <button
          type="button"
          onClick={() => onMoveButton("n")}
          disabled={cooldown}
        >
          Up
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("s")}
          disabled={cooldown}
        >
          Down
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("w")}
          disabled={cooldown}
        >
          Left
        </button>
        <button
          type="button"
          onClick={() => onMoveButton("e")}
          disabled={cooldown}
        >
          Right
        </button>
        <h5>Move Cooldown</h5>
        <p>{cooldown}</p>
      </div>
    </div>
  );
}

export default App;
