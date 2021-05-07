import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PlayerCard from '../components/PlayerCards';
import PlayerForm from '../playerForm';
import './teamView.scss';

function Players({ user, players, setPlayers }) {
  const [showAddPlayerBtn, setShowAddPlayerBtn] = useState(false);

  const handleClick = () => {
    setShowAddPlayerBtn((prevState) => !prevState);
  };

  return (
    <main id="teamMainContainer">
    <section className="header">
    <header className="h1">Team Page </header>
    { !showAddPlayerBtn
      ? <Button id="cardButton1" className="addPlayerToggle" onClick={handleClick}>Add Player</Button>
      : <div>
      <Button id="cardButton2" className="addPlayerToggle" onClick={handleClick}>Close Form</Button>
        <PlayerForm setPlayers={setPlayers} user={user}/>
      </div>
      }
    </section>
    <section className="container">
    <div className="cardHolder">
      {players.map((playerInfo) => (
        <PlayerCard
        key={playerInfo.firebaseKey}
        firebaseKey={playerInfo.firebaseKey}
        playerImageURL={playerInfo.playerImageURL}
        playerName={playerInfo.playerName}
        playerPosition={playerInfo.playerPosition}
        uid={playerInfo.uid}
        setPlayers={setPlayers}
        user={user}
        />
      ))}
    </div>
    </section>
  </main>

  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired,
  user: PropTypes.any
};

export default Players;
