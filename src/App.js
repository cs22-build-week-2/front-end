import React from "react";
import Room from "./components/Room";
import ApiKey from "./components/ApiKey";
import PlayerStatus from "./components/PlayerStatus";
import PlayerActions from "./components/PlayerActions";

function App() {
  return (
    <div>
      <ApiKey />
      <Room />
      <PlayerStatus />
      <PlayerActions />
    </div>
  );
}

export default App;
