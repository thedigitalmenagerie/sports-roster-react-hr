import axios from 'axios';
import firebaseConfig from '../apiKeys';

const DbURL = firebaseConfig.databaseURL;

const getPlayers = (user) => new Promise((resolve, reject) => {
  axios.get(`${DbURL}/players.json?orderBy="uid"&equalTo="${user.uid}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const AddPlayer = (players, user) => new Promise((resolve, reject) => {
  axios.post(`${DbURL}/players.json`, players)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${DbURL}/players/${response.data.name}.json`, body)
        .then(() => {
          getPlayers(user).then((playersArray) => resolve(playersArray));
        });
    }).catch((error) => reject(error));
});

const DeletePlayer = (firebaseKey, user) => new Promise((resolve, reject) => {
  axios.delete(`${DbURL}/players/${firebaseKey}.json`)
    .then(() => getPlayers(user).then((playersArray) => resolve(playersArray)))
    .catch((error) => reject(error));
});

const UpdatePlayer = (players, user) => new Promise((resolve, reject) => {
  axios.patch(`${DbURL}/players/${players.firebaseKey}.json`, players)
    .then(() => getPlayers(user).then(resolve))
    .catch((error) => reject(error));
});

export {
  getPlayers,
  AddPlayer,
  DeletePlayer,
  UpdatePlayer,
};
