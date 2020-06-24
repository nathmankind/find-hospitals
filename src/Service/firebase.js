import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD1pNPTsLc7RCF-eCQPaSlYDHOMZSw3x_0",
  authDomain: "places-auth-store.firebaseapp.com",
  databaseURL: "https://places-auth-store.firebaseio.com",
  projectId: "places-auth-store",
  storageBucket: "places-auth-store.appspot.com",
  messagingSenderId: "826271299206",
  appId: "1:826271299206:web:a6113f4c907332e9024307",
  measurementId: "G-JCY9CW480G",
};

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;
//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();
//   if (!snapshot.exists) {
//     const { email, search } = user;
//     try {
//       await userRef.set({
//         email,
//         search,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();
//     return {
//       uid,
//       ...userDocument.data(),
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
