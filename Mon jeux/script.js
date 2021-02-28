const canvas = document.getElementById('canvas');
const score = document.getElementById('score');
const days = document.getElementById('days');
const endScreen = document.getElementById('endScreen');

vaccinLeft = 60;
gameOverNumber = 50;
loopPlay = false;

function start() {
  count = 0;
  getFaster = 6000;
  daysRemaining = vaccinLeft; 

  canvas.innerHTML = '';
  score.innerHTML = count;
  days.innerHTML = daysRemaining;

  loopPlay ? '' : game();   
  loopPlay = true;

  function game() {
    let randomTime = Math.round(Math.random() * getFaster);
    getFaster > 700 ? getFaster = (getFaster * 0.90) : '';
  
    setTimeout(() => {
      if (daysRemaining === 0){
        youWin();
      } else if (canvas.childElementCount < gameOverNumber){
        virusPop();
        game();
      } else {
        gameOver();
      }
    }, randomTime);  
  };

  const gameOver = () => {
    endScreen.innerHTML = `<div class="gameOver">Game over <br/>score : ${count} </div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false;
  };

  const youWin = () => {
    let accuracy = Math.round(count / vaccinLeft * 100);
    endScreen.innerHTML = `<div class="youWin"> Bien joué! T'as tué ${accuracy} % des virus avec ton vaccin</div>`;
    endScreen.style.visibility = 'visible';
    endScreen.style.opacity = '1';
    loopPlay = false; 
  };
};

// créer un élément
function virusPop() {
  let virus = new Image();

  virus.src = "./media/images/virus.png"

  virus.classList.add('virus');
  virus.classList.add('virus-bis');
  virus.style.top = Math.random() * 500 + 'px';
  virus.style.left = Math.random() * 500 + 'px';

  let x, y;
  x = y = (Math.random() * 45) + 30;
  virus.style.setProperty('--x', `${ x }px`);
  virus.style.setProperty('--y', `${ y }px`);

  let plusMinus = Math.random() < 0.5 ? -1 : 1;
  let trX = Math.random() * 500 * plusMinus;
  let trY = Math.random() * 500 * plusMinus;
  virus.style.setProperty('--trX', `${ trX }%`);
  virus.style.setProperty('--trY', `${ trY }%`);

  canvas.appendChild(virus);
};

// Compte à rebours
canvas.addEventListener('click', () => {
  if (daysRemaining > 0) {
    daysRemaining--;
    days.innerHTML = daysRemaining;
  }
});

// Supprimer l'élément cliqué
document.addEventListener("click", function(e){
  let targetElement = e.target || e.srcElement;

  if (targetElement.classList.contains('virus')) {
    targetElement.remove();
    count++;
    score.innerHTML = count;
  };
});

endScreen.addEventListener('click', () => {
  start();
  setTimeout(() => {
    endScreen.style.visibility = 'hidden';
  }, 1000);
});