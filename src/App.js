import React from 'react';
import Room from './components/Room';
import ApiKey from './components/ApiKey';
import PlayerStatus from './components/PlayerStatus';
import World from './features/world/index.js';

function App() {
  return (
    <div>
      <ApiKey />
      <Room />
      {/* <PlayerStatus /> */}
      <World />
    </div>
  );
}

export default App;
