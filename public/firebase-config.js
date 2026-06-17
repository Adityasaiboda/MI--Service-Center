import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyB_so08MOl9k-UaLnacdT7YXbCxxx7Hhsg",

authDomain: "mi-service-center-616d8.firebaseapp.com",

projectId: "mi-service-center-616d8",

storageBucket: "mi-service-center-616d8.firebasestorage.app",

messagingSenderId: "655272421729",

appId: "1:655272421729:web:c217d551e4e5e8bb8c7d20"

};

const app =
initializeApp(firebaseConfig);

const auth =
getAuth(app);

const db =
getFirestore(app);

export { auth, db };
