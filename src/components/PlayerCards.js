import React, { useState } from 'react';
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import { DeletePlayer } from '../helpers/data/playersData';
import PlayerForm from '../playerForm';
import '../views/viewsStyles/teamView.scss';
import '../App/App.scss';

const PlayerCard = ({
  uid,
  user,
  firebaseKey,
  playerName,
  playerImageURL,
  playerPosition,
  setPlayers
}) => {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    if (type === 'delete') {
      DeletePlayer(firebaseKey, user).then((playerArray) => setPlayers(playerArray));
    } else if (type === 'edit') {
      setEditing((prevState) => !prevState);
    }
  };
  return (
    <Card body className="card text-center" key={firebaseKey} id={uid}>
     <CardImg src={playerImageURL} ></CardImg>
     <CardTitle tag="h5">{playerName}</CardTitle>
    <CardText>{playerPosition}</CardText>
    <Button id="cardButton1" className="mb-2" size="sm" onClick={() => handleClick('delete')}>Delete Player</Button>
    <Button id="cardButton2" size="sm" onClick={() => handleClick('edit')}>
      {editing ? 'Close Form' : 'Edit Player'}
      </Button>
    {editing && <PlayerForm
    formTitle='Edit Player'
    setPlayers={setPlayers}
    uid={uid}
    user={user}
    firebaseKey={firebaseKey}
    playerImageURL={playerImageURL}
    playerName={playerName}
    playerPosition={playerPosition}
    /> }
  </Card>
  );
};

PlayerCard.propTypes = {
  uid: PropTypes.string.isRequired,
  user: PropTypes.any,
  firebaseKey: PropTypes.string.isRequired,
  playerImageURL: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  playerPosition: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
};

export default PlayerCard;
