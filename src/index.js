import './style'
import App from './components/app'

import firebase from 'firebase/app'
import 'firebase/database'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAPOjWPZqJ9xSuFiAWUawxafoVlnEciqv4',
  authDomain: 'tictactoe-34384.firebaseapp.com',
  databaseURL: 'https://tictactoe-34384.firebaseio.com',
  projectId: 'tictactoe-34384',
  storageBucket: 'tictactoe-34384.appspot.com',
  messagingSenderId: '274154345345'
}
firebase.initializeApp(firebaseConfig)

export default App
