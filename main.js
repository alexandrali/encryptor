let currentPage = null;

var app = document.getElementById('app');

var start = document.createElement('div');
var check = document.createElement('div');
var presentation = document.createElement('div');
var create = document.createElement('div');

start.className = 'start-page';
check.className = 'check-pass';
create.className = 'create-pass';

var passExampleIndex = 0;
var checkValueIndex = 0;
var percent = 0;

start.innerHTML =
        `<div>
        <img class="eye" src="./assets/img/eye.png" />
        <img class="title" src="./assets/img/title.png" />
      </div>
      <div class="buttons">
        <a onclick="checkPass()"><span>ПРОВЕРЬТЕ ПАРОЛЬ</span></a>
        <a onclick="openPresentation()"><span>ПРЕЗЕНТАЦИЯ</span></a>
        <a onclick="createPass()"><span>СОЗДАЙТЕ ПАРОЛЬ</span></a>
      </div>`;

check.innerHTML =
      `<div class="back"><img class="rocket" src="./assets/img/rocket.png" onclick="back('check')"/></div>
      <div class="check">
        <h1 onclick="updateCheckValue()"><span id="checkValue"></span></h1>
        <div>
          <a id="valid" onclick="passwordValidation()"><span>НАДЕЖНЫЙ ПАРОЛЬ</span></a>
          <a id="invalid" onclick="passwordValidation()"><span>НЕНАДЕЖНЫЙ ПАРОЛЬ</span></a>
        </div>
      </div>`;

presentation.innerHTML =
      `<div class="back"><img class="rocket" src="./assets/img/rocket.png" onclick="back('presentation')"/></div>
      <div class="presentation">
        <h1 onclick="updateExample()"><span id="passExample"></span></h1>
      </div>`;

create.innerHTML = 
    `<div class="back"><img class="rocket" src="./assets/img/rocket.png" onclick="back('create')" /></div>
    <div class="create">
    <div class="pass-input">
        <input type="text" class="custom-pass" id="custom-pass" placeholder="ПАРОЛЬ.." onkeypress="customValidation()"/>
    </div>
    
    <div class="green">
        <div class="red"></div>
    </div>
    <div class="scale">
        <span>0%</span>
        <span>10%</span>
        <span>20%</span>
        <span>30%</span>
        <span>40%</span>
        <span>50%</span>
        <span>60%</span>
        <span>70%</span>
        <span>80%</span>
        <span>90%</span>
        <span>100%</span>
    </div>
    </div>`;

app.appendChild(start);

function checkPass() {
    app.removeChild(start);
    app.appendChild(check);

    document.getElementById('valid').style.setProperty('box-shadow', '0 0 15px 5px #29DA94', '');
    document.getElementById('invalid').style.setProperty('box-shadow', '0 0 15px 5px #a350af', '');
    
    checkValueIndex = 0;
    document.getElementById('checkValue').innerHTML = checkValues[0].value;
}

function createPass() {
    app.removeChild(start);
    app.appendChild(create);

    percent = 0;
    document.getElementById('custom-pass').value = '';
    document.getElementsByClassName('red')[0].style.setProperty('width', '100%', '');
}

function openPresentation() {
    app.removeChild(start);
    app.appendChild(presentation);

    document.getElementById('passExample').innerHTML = presentationValues[0];
    passExampleIndex = 0;
}

function back(current) {
    if (current == 'check') { app.removeChild(check); }
    if (current == 'create') { app.removeChild(create); }
    if (current == 'presentation') { app.removeChild(presentation); }
    
    app.appendChild(start);
}

function updateExample() {
    if (passExampleIndex === presentationValues.length - 1) {
        passExampleIndex = 0;
    } else {
        passExampleIndex++;
    }

    document.getElementById('passExample').innerHTML = presentationValues[passExampleIndex];
}

function updateCheckValue() {
    if (checkValueIndex === checkValues.length - 1) {
        checkValueIndex = 0;
    } else {
        checkValueIndex++;
    }

    document.getElementById('checkValue').innerHTML = checkValues[checkValueIndex].value;
    checkValue = checkValues[checkValueIndex];

    document.getElementById('valid').style.setProperty('box-shadow', '0 0 15px 5px #29DA94', '');
    document.getElementById('invalid').style.setProperty('box-shadow', '0 0 15px 5px #a350af', '');
}

function passwordValidation () {
    var valid = checkValues[checkValueIndex].valid;
    if (valid) {
        document.getElementById('valid').style.setProperty('box-shadow', '0 0 30px 20px #29DA94', '');
    } else {
        document.getElementById('invalid').style.setProperty('box-shadow', '0 0 30px 20px #a350af', '');
    }
}

function customValidation() {
    var value = document.getElementById('custom-pass').value;

    var number = /\d/.test(value);
    var upperCase = /[A-Z]/.test(value);
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var spec = format.test(value);

    if (number && upperCase && spec && value.length > 7) {
        percent = 100;
        document.getElementsByClassName('red')[0].style.setProperty('width', '0', '');
        return;
    }

    if (number && upperCase && spec) {
        percent = 100;
        document.getElementsByClassName('red')[0].style.setProperty('width', '10%', '');
        return;
    }

    if (number && upperCase || number && spec || upperCase && spec) {
        percent = 70;
        document.getElementsByClassName('red')[0].style.setProperty('width', '30%', '');
        return;
    }

    if (number || upperCase || spec || value.length > 7) {
        percent = 30;
        document.getElementsByClassName('red')[0].style.setProperty('width', '70%', '');
        return;
    }

    if (!number && !upperCase && !spec) {
        percent = 10;
        document.getElementsByClassName('red')[0].style.setProperty('width', '90%', '');
        return;
    }
}

const presentationValues = [
    'sasha2010..12345678',
    'СЭМ',
    'dbnjy..питон',
    'парольнавсё',
    'Я_п0мню_4удн0е_Мгн0венье',
    'Тро-ло-ло'
]

const checkValues = [
    { value: 'sasha2010', valid: false },
    { value: '11111', valid: false },
    { value: '123456', valid: false },
    { value: 'yes', valid: false },
    { value: 'gfhjkm', valid: false },
    { value: 'нашаТанягр0мк0пла4ет', valid: true },
    { value: 'отулЫбкиХмурыйденьSВетЛей', valid: true },
    { value: 'УМЗТкгS', valid: true }
]