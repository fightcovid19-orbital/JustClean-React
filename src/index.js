import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({
  apiKey: "AIzaSyDmacItutW55DwYxcLlv6A0nWiR6r4tQik",
  authDomain: "justclean-4db3e.firebaseapp.com",
  databaseURL: "https://justclean-4db3e.firebaseio.com",
  projectId: "justclean-4db3e",
  storageBucket: "justclean-4db3e.appspot.com",
  messagingSenderId: "873878997627",
  appId: "1:873878997627:web:5205a1961829b6ab1a70de",
  measurementId: "G-YC1YWQ7LJW"
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
