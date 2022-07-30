

sendKey();

const SerialPort = require('serialport');
var portName;
var portConnect = 0;
var MYport;
var x = 0;

function listPorts() {

  portSerectButton.innerHTML = ''; //settingにて、portSerectButton内の子要素を全て消す

  var statePort = 0;
 console.log("Connecting to port.....");
 SerialPort.list().then(  //非同期通信はじまり
   ports => {
   statePort = 1;
   ports.forEach(p => {
     if(p.vendorId == 9999){
      console.log('Found It')
      MYport = p.comName.toString();
      console.log(MYport);
     }
    console.log(`Port Information : `)
    console.log(`${p.path}\t${p.pnpId || ''}\t//${p.manufacturer || ''}`)
    // $("#leftBottom").val(`"${port.path}"に接続されました`);
    timelineUpdate(`"${p.path}"を認識しました`);

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `${p.path}`;
    newDiv.classList.toggle("js-modal-close");
    newDiv.classList.toggle("setting-button");
    newDiv.onclick = () => {
      // port = "undefined";
      if (x) {
        port = null;
      }
      x=1;
      console.log(`"${p.path}"セレクトボタンが押されました！`);
      portConnect = newDiv.innerHTML;
      port = new SerialPort(portConnect, {
        // parser: new SerialPort.parsers.Readline('\r\n'),
        parser: new SerialPort.parsers.Readline(''),
        baudRate: 9600
      });
      timelineUpdate(`"${portConnect}"に接続されました`);
      port.on('open', function () {
        console.log('Serial open.');
        timelineUpdate(`Ready`)
        // setInterval(write, 1000, 'OK\n');
      });

      port.on('data', function (data) {
        console.log('Data:', data.toString('utf8'));
        timelineUpdate(data.toString('utf8'));
      });

      // listPorts();
      // clickPortSerectButton(newDiv.innerHTML);
      // listPorts();
    }
    portSerectButton.appendChild(newDiv);

    // $("#serialport-setting").val(`${port.path}`);
    SSUpdate(`${p.path}`);
    portName = `${p.path}`;
    console.log(">>> succeeded");
 })
  },
  err => {
   console.error('Error listing ports', err);
   timelineUpdate("listing ports");
  }
 );
 console.log("-----END-----");
 console.log(portName);
 console.log(portConnect);
 if ((document.getElementById('portSerectButton').children)) {
   $("serialport-setting").val(`No port`);
   console.log(document.getElementById('portSerectButton').value);
 }
 if(statePort == 0){
   // $("#leftBottom").val(`No port`);
   // timelineUpdate(`No port`);
   // setTimeout(timelineUpdate, 1000, `No port`)
   $("#serialport-setting").val(`No port`);
   console.log(document.getElementsByClassName("serialport-setting"));
   // console.log(document.getElementById("serialport-setting").value);
 }

 var pElement = document.getElementById('portSerectButton');

  if (pElement.hasChildNodes()) {
      // alert('子要素が見つかりました');
  } else {
      // timelineUpdate(`Err : 子要素なし`);
      // alert('子要素が見つかりませんでした');
  }

}

listPorts();


function clickPortSerectButton(portNamae){
  console.log(`portConnect`);
  console.log(portNamae);
  return portNamae;
}


function write(data) {
    console.log('Write: ' + data);
    port.write(new Buffer(data), function(err, results) {
      if(err) {
        console.log('Err: ' + err);
        console.log('Results: ' + results);
        timelineUpdate(`Err: ` + err);
      }
  });
}

function timelineUpdate(textVal) {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let sec = date.getSeconds();
  hour = ('0' + hour).slice(-2);
  minute = ('0' + minute).slice(-2);
  sec = ('0' + sec).slice(-2);
  let time = `${hour}:${minute}.${sec}`;
  var inputVal = time + `> ` + textVal + '\n';
  if (inputVal.match(/Err/)) {
    // inputVal.style.color = '#ffffff';
  }
  $("#leftBottom").val(inputVal + $("#leftBottom").val());

  // var obj = document.getElementById("leftBottom");
  // var a = document.documentElement;
  // var y = a.scrollHeight - a.clientHeight;
  // $("#leftBottom").scroll(0, y);
}

function SSUpdate(textVal) {
  // if(document.getElementById("serialport-setting").value == `No port`){
  //   $("#serialport-setting").val(``);
  // }
  var inputVal = textVal + `　`;
  // $("#serialport-setting").val($("#serialport-setting").val() + inputVal);
  // $("#serialport-setting").val($("#serialport-setting").val());
}


// function serialText() {
//   var sendVal = document.getElementById("sendBox").value;
//   setTimeout(write, 10, sendVal);
//   timelineUpdate('send: ' + sendVal);
// }

function serialWrite(sendVal) {
  setTimeout(write, 0, sendVal);
  timelineUpdate('send: ' + sendVal);
}


var judgKey = 1; //sendKey()を行うかの判断
var developerSerialWriteState = 1;

function sendKey(){
  const array = [];
  var keyState;
  var developerSW_down = document.getElementById("SWdown");
  var developerSW_up = document.getElementById("SWup");
  var SWCheck_d = document.getElementById("default");
  var SWCheck_c = document.getElementById("custom");



  window.addEventListener("keydown",(e) =>{
    if (SWCheck_d.checked) developerSerialWriteState = 1;
    if (SWCheck_c.checked) developerSerialWriteState = 0;
    array.push(e.key);
    if((!(keyState == e.keyCode))&&(judgKey == 1)){
      keyCode = e.keyCode;
      // serialWrite(keyCode + ":" + e.key + `;`);
      if (developerSerialWriteState) {
        // serialWrite(keyCode);
        serialWrite(e.key);
      }else{
        serialWrite(window[document.getElementById("SWdown").value]);
      }
    }
    keyState = e.keyCode;
  });

  window.addEventListener("keyup",(e) =>{
    if (SWCheck_d.checked) developerSerialWriteState = 1;
    if (SWCheck_c.checked) developerSerialWriteState = 0;
    array.push(e.key);
    keyCode = e.keyCode;
    if(judgKey == 1) {
      if(developerSerialWriteState){
        // serialWrite(keyCode * keyCode);
        serialWrite(e.key + "!");
      }else{
        serialWrite(window[document.getElementById("SWup").value] + "!" );
      }
    }
    keyState = e.keyCode * e.keyCode;
  });
}


// function sendKey(){
//   const array = [];
//   var keyState;
//
//   // window.addEventListener("keydown",(e) =>{
//   //   array.push(e.key);
//   //   keyCode = e.keyCode;
//   //   serialWrite(keyCode);
//   // });
//
//   window.addEventListener("keydown",(e) =>{
//     array.push(e.key);
//     if((!(keyState == keyCode))&&(judgKey == 1)){
//       keyCode = e.keyCode;
//       // serialWrite(keyCode + ":" + e.key + `;`);
//       // serialWrite(keyCode + `:` + e.key + '\n');
//       // serialWrite(keyCode + `:` + e.key + '\n');//new
//       serialWrite(keyCode);//char→string
//       // textarea.innerHTML = e.key;
//       // textarea2.innerHTML += e.key;
//     }
//     keyState = keyCode;
//
//         timelineUpdate("keyState" + keyState);
//   });
//
//
//   //
//   window.addEventListener("keyup",(e) =>{
//     array.push(e.key);
//     keyCode = e.keyCode;
//     if(judgKey == 1) {
//       // serialWrite(keyCode + `:` + e.key + `!` + '\n');//new
//       serialWrite(keyCode * keyCode);//char→string
//       // serialWrite(keyCode + ":" + e.key + `!` + `;`);
//     }
//     keyState = keyCode * keyCode ;
//
//     timelineUpdate("keyState" + keyState);
//
//     // textarea.innerHTML = e.key + "!";
//     // textarea2.innerHTML += e.key + "!";
//   });
// }
