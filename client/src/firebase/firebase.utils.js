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

export const addCollectionAndDocuments = async (colelctionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(colelctionKey);
  
  //batch write
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  //promise can use .then
  return await batch.commit();

}

export const convertCollectionsSnapshotToMap = collectionsSnapshot => {
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
    const {title, items} = docSnapshot.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};


firebase.initializeApp(config);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);      
    }, reject)
  })
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
