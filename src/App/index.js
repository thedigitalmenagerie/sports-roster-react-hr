import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';
import 'firebase/auth';
import firebaseConfig from '../helpers/apiKeys';
import NavBar from '../components/NavBar';
import './App.scss';
import Routes from '../helpers/Routes';
import { getPlayers } from '../helpers/data/playersData';

firebase.initializeApp(firebaseConfig);

function App() {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
          user: authed.email.split('@')[0]
        };
        setUser(userInfoObj);
        getPlayers(userInfoObj).then((resp) => setPlayers(resp));
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
    <Router>
      <NavBar user={user}/>
      <Routes user={user} players={players} setPlayers={setPlayers}/>
    </Router>
    </>
  );
}

export default App;
