import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDoDZEP-YZez8RdPSvzEVvKrfv0mo0UGzo",
  authDomain: "week7-junyi.firebaseapp.com",
  projectId: "week7-junyi",
  storageBucket: "week7-junyi.firebasestorage.app",
  messagingSenderId: "950475868202",
  appId: "1:950475868202:web:c0f3fac471f0fa32c5db53"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app }
export default db
