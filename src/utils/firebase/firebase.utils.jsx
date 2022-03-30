import { initializeApp } from 'firebase/app';
import {
  getAuth,
  singInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDQ6jz-u5y3vj_797hRmQ8Bjos2PaQXbEE',
  authDomain: 'mstore-clothing-db.firebaseapp.com',
  projectId: 'mstore-clothing-db',
  storageBucket: 'mstore-clothing-db.appspot.com',
  messagingSenderId: '1005823066364',
  appId: '1:1005823066364:web:5b8b86940a6d3d3ff5d779',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('Erro ao criar usuário', error.message);
    }
  }

  return userDocRef;
};
