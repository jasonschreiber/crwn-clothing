import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBb8Qohtl-oeHt76sKTfi8NjQuhNSSJH80",
    authDomain: "crwn-db-50651.firebaseapp.com",
    databaseURL: "https://crwn-db-50651.firebaseio.com",
    projectId: "crwn-db-50651",
    storageBucket: "crwn-db-50651.appspot.com",
    messagingSenderId: "626165105262",
    appId: "1:626165105262:web:dea9e2418e56caedeb1c7f",
    measurementId: "G-YL6K9C0365"
  };

export const createUserProfileDocument = async (userAuth, addtionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();
      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...addtionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }

    return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
