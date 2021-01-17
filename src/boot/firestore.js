const firebase = require("firebase/app");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDdQJXWQm_Wy_D9tMIwN8QjM670VcFA8VY",
  authDomain: "dps-smarter-system-7f247.firebaseapp.com",
  databaseURL: "https://dps-smarter-system-7f247.firebaseio.com",
  projectId: "dps-smarter-system-7f247",
  storageBucket: "dps-smarter-system-7f247.appspot.com",
  messagingSenderId: "272353199092",
  appId: "1:272353199092:web:5d65d1b75f8e617c53efa1",
  measurementId: "G-DF4CVLK4KK"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
db.settings({
  cacheSizeBytes: db.CACHE_SIZE_UNLIMITED
});
db.enablePersistence();

export { db };
