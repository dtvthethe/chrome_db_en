const API_KEY = '',
  AUTH_DOMAIN = '',
  DB_URL = '',
  PROJECT_ID = '',
  BUCKET = '',
  MSG_SENDER_ID = '',
  APP_ID = '',
  MEA_ID = '';
const ALERT_EXIST = 1,
  ALERT_LOADED = 2,
  ALERT_ADDED = 3;
  
async function authFirebase() {
  const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DB_URL,
    projectId: PROJECT_ID,
    storageBucket: BUCKET,
    messagingSenderId: MSG_SENDER_ID,
    appId: APP_ID,
    measurementId: MEA_ID
  };
  await firebase.initializeApp(firebaseConfig);
  const rootRef = firebase.database().ref();
  return rootRef.child('words');
}
