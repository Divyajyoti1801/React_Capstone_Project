//Understanding Firebase Connectivity
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCZCpU72VJoYFCB2Dqgoehq9AdQtQJffs",
  authDomain: "react-ecommerce-website-f52fc.firebaseapp.com",
  projectId: "react-ecommerce-website-f52fc",
  storageBucket: "react-ecommerce-website-f52fc.appspot.com",
  messagingSenderId: "929337477529",
  appId: "1:929337477529:web:4460aeb26944bbd84cab08",
};

// Initialize Firebase Instance of CURD Operation
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Provider
//For Google Provider
//We can have multiple provider...
const googleProvider = new GoogleAuthProvider();
//Force Them to select an account with Google popup.
googleProvider.setCustomParameters({
  prompt: "select_account",
});

//Authentication
//We need this only one
export const auth = getAuth();

//Sign-In With Google Popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//Sign-In With Google Redirect
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

export const db = getFirestore(); //This instance we use to access the database .

//We are adding collections and documents to firestore Database.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  //This a collection reference in which we will add different objects which are basically documents.
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  //This code point towards the object around sign-in using it UID but it will create object when its not in database.
  const userDocRef = doc(db, "users", userAuth.uid);
  //This will create Snapshot through which we can check whether it is in the database or not.
  const userSnapshot = await getDoc(userDocRef);
  //.exists() is used to check whether it exists or not.

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error in Creating New user", error.message);
    }
  }
  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
/**
 * {
 *  next: callback,
 *  error: errorCallback
 *  complete: completedCallback
 * }
 */

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    },reject);
  });
};