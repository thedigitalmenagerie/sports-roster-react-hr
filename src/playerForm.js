import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AddPlayer, UpdatePlayer } from './helpers/data/playersData';
import './styles/playerForm.scss';

const PlayerForm = ({
  formTitle,
  setPlayers,
  playerImageURL,
  playerName,
  playerPosition,
  firebaseKey,
  user,
  uid,
}) => {
  const [players, setPlayer] = useState({
    playerImageURL: playerImageURL || '',
    playerName: playerName || '',
    playerPosition: playerPosition || '',
    firebaseKey: firebaseKey || null,
    uid: uid || user.uid
  });

  const HandleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (players.firebaseKey) {
      UpdatePlayer(players, user).then((playersArray) => setPlayers(playersArray));
    } else {
      AddPlayer(players, user).then((playersArray) => setPlayers(playersArray));
    }
  };

  return (
    <>
    <div className='player-form'>
      <form id='addPlayerForm'
      autoComplete='off'
      onSubmit={HandleSubmit}
      >
        <h2>{formTitle}</h2>
        <label>Image: </label>
        <input name='playerImageURL' type='url' placeholder='Image URL' value={players.playerImageURL} onChange={HandleInputChange}></input>
        <label>Name:</label>
        <input name='playerName' type='text' placeholder='Player Name' value={players.playerName} onChange={HandleInputChange}></input>
        <label>Position: </label>
        <input name='playerPosition' type='text' placeholder='Position on Field' value={players.playerPosition} onChange={HandleInputChange}></input>
        <button id="submitButton" type='submit'>Submit</button>
      </form>
    </div>
    </>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  playerImageURL: PropTypes.string,
  playerName: PropTypes.string,
  playerPosition: PropTypes.string,
  firebaseKey: PropTypes.string,
  uid: PropTypes.string,
  user: PropTypes.any
};

export default PlayerForm;
