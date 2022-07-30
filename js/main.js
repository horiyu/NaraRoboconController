
// autoScroll();

// カメラ
const resolution = { w: 1080, h: 720 };
let video;
let media;
let canvas;
let canvasCtx;




  backgrounds = document.getElementById("background");
function background(select){
  switch (select) {
    case 'camera':
      // video要素をつくる
      video          = document.createElement('video');
      video.id       = 'camera';
      video.autoplay = true;
      document.getElementById('background').appendChild(video);
      // video要素にWebカメラの映像を表示させる
      media = navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { ideal: resolution.w },
          height: { ideal: resolution.h }
        }
      }).then(function(stream) {
        video.srcObject = stream;
      });
      break;
    case 'black':
      backgrounds.innerHTML = '';
      backgrounds.style.backgroundColor = '#303030';
      break;
    case 'white':
      backgrounds.innerHTML = '';
      backgrounds.style.backgroundColor = '#f0f0f0';
      break;
    default:

  }
}

// 読込
function load() {
  var MemoData = "";

  if(!localStorage.getItem('MemoData')) {
    MemoData = "No data";
  } else {
    MemoData = localStorage.getItem('MemoData');
  }
  document.form1.Memo.value = MemoData;
}
// 保存
function save() {
  var MemoData = document.form1.Memo.value;
  localStorage.setItem('MemoData', MemoData);
}

$(function(){
    $('.js-modal-open').each(function(){
        $(this).on('click',function(){

            judgKey = 0;

            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            return false;
        });
    });
    $('.js-modal-close').on('click',function(){
        $('.js-modal').fadeOut();

        judgKey = 1;

        return false;
    });
});


// setting
// checkbox

// function switchIcon(t) {
//
//   var checkboxJudge = ["camera", "connect", "memo", "controller", "setting"];
//   var topIcon = ["camera", "connect", "memo", "controller", "setting"];
//
//   if (document.getElementById("checkboxJudge[t]").checked) {
//     document.getElementById('topIcon[t]').style.visibility = 'visible';
//   } else {
//     document.getElementById('topIcon[t]').style.visibility = 'hidden';
//   }
// }


function switchIcon(t) {

  var checkboxIcon = ["checkbox-reload", "checkbox-connect", "checkbox-memo", "checkbox-controller", "topRight-developer"];
  var spanIcon = ["topRight-reload", "topRight-connect", "topRight-memo", "topRight-controller", "topRight-developer"];

  if (document.getElementById(checkboxIcon[t]).checked) {
    document.getElementById(spanIcon[t]).style.visibility = 'visible';
  } else {
    document.getElementById(spanIcon[t]).style.visibility = 'hidden';
  }
}

// 「全て選択」チェックで全てにチェック付く
function AllChecked(){
  var all = document.checkboxForm.all.checked;
  for (var i=0; i<document.checkboxForm.checkbox.length; i++){
    document.checkboxForm.checkbox[i].checked = all;
  }
}

// 一つでもチェックを外すと「全て選択」のチェック外れる
function　DisChecked(){
  var checks = document.checkboxForm.checkbox;
  var checksCount = 0;
  for (var i=0; i<checks.length; i++){
    if(checks[i].checked == false){
      document.checkboxForm.all.checked = false;
    }else{
      checksCount += 1;
      if(checksCount == checks.length){
        document.checkboxForm.all.checked = true;
      }
    }
  }
}


function clearTimeline() {
	var timeline = document.getElementById("leftBottom");
  timeline.value = '';
}


let clearMessageState = 0;
document.addEventListener('keydown', (event) => {
  document.onkeydown = function (event){
  	if(!event) event = window.event;
    autoScroll();

  	if((event.keyCode == 13)&&(clearMessageState == 0)&&(judgKey == 1)){
      clearMessageState = 1;
      const clearMessageDiv = document.createElement("div");
      clearMessageDiv.innerHTML = "CLEAR";
      clearMessageDiv.classList.toggle("clearMessage");
      clearMessage.appendChild(clearMessageDiv);
      setTimeout(clearMessageDivDelete, 2000);
  	}
    // var random = Math.round( Math.random()*100 );
    // if (event.keyCode == random) {
    //   window.open('hackWindow/index.html', null, 'top=100,left=100,width=300,height=400');
    // }
  };
});

function clearMessageDivDelete() {
  clearMessage.innerHTML = '';
  clearMessageState = 0;
}

function autoScroll() {
  var obj = document.getElementById("leftBottom");
  var a = document.documentElement;
  var y = a.scrollHeight - a.clientHeight;
  leftBottom.scroll(0, y);
}



function previewFile(file) {
  // プレビュー画像を追加する要素
  const preview = document.getElementById('preview');

  // FileReaderオブジェクトを作成
  const reader = new FileReader();

  // ファイルが読み込まれたときに実行する
  reader.onload = function (e) {
    const imageUrl = e.target.result; // 画像のURLはevent.target.resultで呼び出せる
    const img = document.createElement("img"); // img要素を作成
    img.src = imageUrl; // 画像のURLをimg要素にセット
    preview.appendChild(img); // #previewの中に追加

    backgrounds.innerHTML = '';
    backgrounds.appendChild(img); // #
  }

  // いざファイルを読み込む
  reader.readAsDataURL(file);
}

// <input>でファイルが選択されたときの処理
const fileInput = document.getElementById('example');
const handleFileSelect = () => {
  const files = fileInput.files;
  for (let i = 0; i < files.length; i++) {
    previewFile(files[i]);
    console.log(files[i]);　// 1つ1つのファイルデータはfiles[i]で取得できる
  }
}
// ファイル選択時にhandleFileSelectを発火
fileInput.addEventListener('change', handleFileSelect);
