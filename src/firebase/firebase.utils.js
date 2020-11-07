import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC30hq2ybR4nzDz6slCQgRtg909I9_qbjI",
  authDomain: "ecommerce-store-8eeb1.firebaseapp.com",
  databaseURL: "https://ecommerce-store-8eeb1.firebaseio.com",
  projectId: "ecommerce-store-8eeb1",
  storageBucket: "ecommerce-store-8eeb1.appspot.com",
  messagingSenderId: "478906277442",
  appId: "1:478906277442:web:6b53d7f627e34fa562d7db",
  measurementId: "G-TTSBQS931N"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
