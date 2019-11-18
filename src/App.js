import React, { useState, useEffect } from "react";

function App() {
  const [key, setKey] = useState("");
  const [currentApiKey, setCurrentApiKey] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setCurrentApiKey(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  const onApiKeyChange = event => {
    setKey(event.target.value);
  };

  const onApiKeySubmit = event => {
    event.preventDefault();
    localStorage.setItem("token", JSON.stringify(key));
    setCurrentApiKey(key);
  };

  return (
    <div className="App">
      <form onSubmit={event => onApiKeySubmit(event)}>
        <label for="token">Input your API Key here!</label>
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
    </div>
  );
}

export default App;
