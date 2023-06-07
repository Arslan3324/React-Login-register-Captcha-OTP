import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth'


const firebaseConfig ={
  apiKey: "AIzaSyCTJdsKTj8iCb3A-JYE7nTm62pkKBAVxT4",
  authDomain: "fir-react-78eed.firebaseapp.com",
  projectId: "fir-react-78eed",
  storageBucket: "fir-react-78eed.appspot.com",
  messagingSenderId: "906036684889",
  appId: "1:906036684889:web:0b526502e1513a01cd2948"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;