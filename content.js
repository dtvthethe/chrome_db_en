let data = [],
  eventsRef = null;

$(function(){
  importElement();
  eventsRef = authFirebase();
  fetchData(eventsRef);

  document.addEventListener('dblclick', function(e, t) {
    let textSelected = document.getSelection().toString();

    if (textSelected.length === 0 || textSelected === '\n') {
      return;
    }
    
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
    </p>`,
    menu = `<div style="
      position: fixed;
      top: 4px;
      z-index: 1000;
      padding: 3px 6px;
      background-color: white;
      border: 1px solid #bd8502;
      border-bottom-right-radius: 3px;
      border-top-right-radius: 3px;
      border-left: none;
      opacity: 0.8;
    ">
      <a src="javascript:void(0);">Menu</a>
      <img src="https://github.com/dtvthethe/chrome_db_en/blob/main/icons/favicon-32x32.png?raw=true" alt="menu" style="
        display: inline;
        width: 21px;
        height: 21px;
      ">
    </div>
    <div style="
      height: 32px;
      width: 81px;
      top: 4px;
      z-index: 1001;
      position: fixed;
      opacity: 0;
      cursor: pointer;
    "></div>`,
    list = `
    <div style="
        position: fixed;
        top: 10px;
        z-index: 1000;
        left: 100px;
        border: 1px solid #ca9e48;
        border-radius: 3px;
        background: rebeccapurple;
    }">
        <span>X</span>
        <p>List of new word</p>
        <div>
            <p>Number of words</p>
            <input type="text" id="db-click-en-input-num" value="10"></input>
            <button>Load</button>
            <button>Transale</button>
        </div>
        <table border="1px">
            <thead>
                <th>
                    <input id="db-click-en-input-all" type="checkbox"></input>
                </th>
                <th>ENG</th>
                <th>VIE</th>
                <th>Pronounciation</th>
                <th></th>
            </thead>
            <tbody>
                <tr>
                    <td><input class="db-click-en-input-word" type="checkbox"></td>
                    <td>a</td>
                    <td>b</td>
                    <td>@</td>
                    <td>
                        <span>Delete</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
  
  $('body').append(alertExisted).append(alertDataLoaded).append(alertDatasuccess).append(menu).append(list);
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
