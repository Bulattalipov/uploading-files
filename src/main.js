import {
  createApp
} from 'vue'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router'
import {
  createPinia
} from 'pinia'

// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Z5_GDVR6yszHsVR0-D64ohKh0VzGU8Q",
  authDomain: "uploading-files-9c17b.firebaseapp.com",
  projectId: "uploading-files-9c17b",
  storageBucket: "uploading-files-9c17b.appspot.com",
  messagingSenderId: "950691315064",
  appId: "1:950691315064:web:41098052163657890d1c8d"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')