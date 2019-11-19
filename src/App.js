import React from "react";
import Room from "./components/Room";
import ApiKey from "./components/ApiKey";
import PlayerStatus from "./components/PlayerStatus";

function App() {
  return (
    <div>
      <ApiKey />
      <Room />
      <PlayerStatus />
    </div>
  );
}

export default App;
