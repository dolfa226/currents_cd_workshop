document.addEventListener("DOMContentLoaded", initialize);

var button = document.getElementById('button');
var stop_button = document.getElementById('stop_button');
var output_container = document.getElementById('output_container');

function initialize(){
  if (annyang) {
    var commands = {
      'Put on glasses': putGlasses,
      'Move to the right': moveRight,
      'Zoom in': zoomIn,
      'Wipe the lens': clearFinal,
      // 'clear the screen more': clearComplete
    }

    annyang.addCommands(commands);

    button.addEventListener('click', startListening);
    stop_button.addEventListener('click', abort);

    annyang.addCallback('start', startFunction);
    annyang.addCallback('soundstart', soundStarted);
    annyang.addCallback('result', resultFunction);
    annyang.addCallback('resultNoMatch', resultNoMatch);
  }
}

function startListening(){
 document.body.classList.remove('result_ready'); 
 annyang.start();
 document.getElementById('input_text').innerHTML = '';
}

function startFunction(){
  button.classList.add('disabled');
  stop_button.classList.remove('disabled');
}

function soundStarted(){
  document.getElementById('listening').classList.add('visible');
}

function resultFunction(phrases){
  document.body.classList.add('result_ready'); 
  for (var i = 0; i < phrases.length; i++) {
    //       document.getElementById('input_text').innerHTML = phrases;
    document.getElementById('input_text').insertAdjacentHTML('beforeend', (i + 1) + '. ' + phrases[i] + '<br>');
  }
  abort();
}

function abort(){
  document.getElementById('listening').classList.remove('visible');
  button.classList.remove('disabled');
  stop_button.classList.add('disabled');
  annyang.abort()
}




function putGlasses(){
  // generateText('Say "move to the right" to adjust lens ', false);
  document.getElementById("blurwater").style.filter= 'blur(0px)';
  document.getElementById("rec").style.zIndex= '12';
  document.getElementById("blurwater").style.animation= 'glassesrec 2s 1';
  document.getElementById("whiterec").style.animation= 'whiterecexpand 1s 1';
  document.getElementById("whiterec").style.width= '300px';
  document.getElementById("instructions").style.opacity= '.7';
  document.getElementById("instructions").textContent= 'Say "Move to the right" to adjust';



}




function moveRight(){
  // generateText('Say "Zoom in" to change depth ', false);
  // document.getElementById("water").style.filter= 'blur(0px)';
  document.getElementById("rec").style.transform= 'rotate(0deg)';
  document.getElementById("blurwater").style.transform= 'rotate(0deg)';
  document.getElementById("instructions").textContent= 'Say "Zoom in" to change depth';


}





function zoomIn(){
  // generateText('Say "wipe the lens" for maintenance', false);
  // document.getElementById("water").style.filter= 'blur(0px)';
  document.getElementById("blurwater").style.transform= 'scale(2)';
  document.getElementById("rec").style.transform= 'scale(2)';
  document.getElementById("whiterec").style.animation= 'whiterecshrink 12s 1';
  document.getElementById("instructions").textContent= 'Say "Wipe the lens" for maintenance';

  var water = document.getElementById("rec");
  var opacity = 0.1;

  var apparence = function(){
    if(opacity <= 1.0) {
        water.style.opacity =  opacity;
    } else { 
        clearInterval(timer);
    }
    opacity += 0.1;

}

var timer = window.setInterval(apparence, 1000);

}




function clearFinal(){
  // generateText('The screen is completely clear', false);
  document.getElementById("blurwater").style.filter= 'blur(0px)';
  document.getElementById("rec").style.opacity= '0';
  document.getElementById("whiterec").style.animation= 'whiterecshrink 12s 1';

  var water = document.getElementById("rec");
  var opacity = 0.1;

  var apparence = function(){
    if(opacity <= 1.0) {
        water.style.opacity =  opacity;
    } else { 
        clearInterval(timer);
    }
    opacity += 0.1;

}

var timer = window.setInterval(apparence, 3000);

}




function resultNoMatch(){
  generateText('I do not have something to say to that', true);
}

function generateText(text, error){
  var div = document.createElement('div');
  div.classList.add('message');
  if (error){
    div.classList.add('error');
  }
  div.innerHTML = text;
  output_container.appendChild(div);
  setTimeout(function(){
    div.classList.add('visible');
  }, 500)
}

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();

  datetime.textContent =  h + ":" + m + ":" + s;
}

setInterval(time, 1000);