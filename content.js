let data = [];
const ALERT_EXIST = 1;
const ALERT_LOADED = 2;
const ALERT_ADDED = 3;

$(function(){
  importElement();
  setTimeout(authfirebase(), 1000);
  setTimeout(fetchData(), 2000);

  document.addEventListener("dblclick", function(e, t) {
    let textSelected = document.getSelection().toString();
    
    if (data.includes(textSelected)) {
      alertMsg(ALERT_EXIST);
    } else {
      pushData(textSelected);
    }
  });
});

async function authfirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAOFlUOiFx49azCpd7AY_5y0NCC6dHHGp0",
    authDomain: "eng-db-click.firebaseapp.com",
    databaseURL: "https://eng-db-click-default-rtdb.firebaseio.com",
    projectId: "eng-db-click",
    storageBucket: "eng-db-click.appspot.com",
    messagingSenderId: "630778758003",
    appId: "1:630778758003:web:2b0c3c636af5e2b17fbb06",
    measurementId: "G-G2V6GZWHJ6"
  };
  await firebase.initializeApp(firebaseConfig);
}

async function fetchData() {
  const rootRef = firebase.database().ref();
  const eventsRef = rootRef.child('users');

  await eventsRef.on("child_added", snap => {
    let user = snap.val();
    data.push(user.name);
  });
  alertMsg(ALERT_LOADED);
}

async function pushData(en) {
  const rootRef = firebase.database().ref();
  const eventsRef = rootRef.child('users');
  const word = {
    name: en,
    email: 'aaa',
    age: 10
  };

  await eventsRef.push(word, function() {
    data.push(en);
    alertMsg(ALERT_ADDED);
  });
}

function importElement() {
  let alertExisted = `<p id="db-click-en-alert-exists" style="position: fixed;
      background-color: #ffbb9b;
      padding: 10px 21px;
      color: #1f1e1e;
      border-radius: 3px;
      border: 1px solid #ea9a9a;
      top: 17px;
      z-index: 1000;
      left: 600px;
      display: none;
      opacity: 0.8;">
      Text existed!
    </p>`,
    alertDataLoaded = `<p id="db-click-en-alert-done" style="position: fixed;
      background-color: #e41343;
      padding: 10px 21px;
      color: #ffffff;
      border-radius: 3px;
      border: 1px solid #c32828;
      top: 17px;
      z-index: 1000;
      left: 600px;
      display: none;
      opacity: 0.8;">
      Data loaded!
    </p>`,
    alertDatasuccess = `<p id="db-click-en-alert-add" style="position: fixed;
      background-color: rgb(2 95 9);
      padding: 10px 21px;
      color: #ffffff;
      border-radius: 3px;
      border: 1px solid rgb(108 171 107);
      top: 17px;
      z-index: 1000;
      left: 600px;
      display: none;
      opacity: 0.8;">
      Data succes!
    </p>`;
  
  $('body').append(alertExisted).append(alertDataLoaded).append(alertDatasuccess);
}

function alertMsg(alertType = null) {
  let alert = null;

  switch(alertType) {
    case ALERT_EXIST:
      alert = $('#db-click-en-alert-exists');
      break;
    case ALERT_LOADED:
      alert = $('#db-click-en-alert-done');
      break;
    case ALERT_ADDED:
      alert = $('#db-click-en-alert-add');
      break;
    default:
      return;
  }

  alert.show();
  setTimeout(function() {
    alert.hide();
  } ,1000);
}