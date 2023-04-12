import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCtgKZMFzx5ngrk2503ZrhMjxRmSQIrZl0',
  authDomain: 'best-internet-in-my-zone.firebaseapp.com',
  projectId: 'best-internet-in-my-zone',
  storageBucket: 'best-internet-in-my-zone.appspot.com',
  messagingSenderId: '949463872388',
  appId: '1:949463872388:web:03e2c94b1d30b4f14423d1',
  measurementId: 'G-B4R9TT74HC',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
