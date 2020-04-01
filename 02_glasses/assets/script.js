document.addEventListener("DOMContentLoaded", initialize);

var button = document.getElementById('button');
var stop_button = document.getElementById('stop_button');
var output_container = document.getElementById('output_container');

function initialize(){
  if (annyang) {
    var commands = {
      'Put on glasses': clearScreen,
      'Wipe the lens': clearScreenMore,
      'continue to clear': clearFinal
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

var water = document.getElementById("rec");
var opacity = 0.1;



function clearScreen(){
  generateText('Do you want to clear more', false);
  document.getElementById("water").style.filter= 'blur(0px)';
  document.getElementById("rec").style.zIndex= '12';

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

function clearScreenMore(){
  generateText("The screen is still unclear", false); 
  document.getElementById("water").style.filter= 'blur(3px)';
  document.getElementById("rec").style.opacity= '.1';
}

function clearFinal(){
  generateText('The screen is completely clear', false);
  document.getElementById("water").style.filter= 'blur(0px)';
  document.getElementById("rec").style.opacity= '0';
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