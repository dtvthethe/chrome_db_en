let data = [],
  eventsRef = null;

$(function(){
  importElement();
  eventsRef = authFirebase();
  fetchData(eventsRef);

  document.addEventListener('dblclick', function(e, t) {
    let textSelected = document.getSelection().toString();
    
    if (data.includes(textSelected)) {
      alertMsg(ALERT_EXIST);
    } else {
      pushData(eventsRef, textSelected);
    }
  });
});

function fetchData(eventsRef) {
  eventsRef.then(function(res) {
    res.on('child_added', snap => {
      let item = snap.val();
      data.push(item.en);
    });
    alertMsg(ALERT_LOADED);
  });
}

function pushData(eventsRef, en) {
  eventsRef.then(function(res) {
    const word = {
      en: en,
      vi: '',
      audio_link: ''
    };
  
    res.push(word, function() {
      data.push(en);
      alertMsg(ALERT_ADDED);
    });
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
