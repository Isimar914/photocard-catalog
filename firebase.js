  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
  import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCjvdkMpoa8US_47kls_vbNPWB-PJ90emQ",
    authDomain: "photocard-catalog-5cff3.firebaseapp.com",
    projectId: "photocard-catalog-5cff3",
    storageBucket: "photocard-catalog-5cff3.firebasestorage.app",
    messagingSenderId: "203037335840",
    appId: "1:203037335840:web:3c93ef52233e16cea3f745"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  export { db };

  