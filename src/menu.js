// menu.js
//function hides the main menu to start the game
function startGame() {
  const canvas = document.getElementById("canvas");
  const menu = document.getElementById("main-menu");
  canvas.style.display = "block";
  menu.style.display = "none";
}

function chooseDifficultyLevel(){
  const mainMenu = document.getElementById("main-menu");
  const diffMenu = document.getElementById("difficulty-menu");
  mainMenu.style.display = "none";
  diffMenu.style.display = "flex";
}

export { startGame };
export { chooseDifficultyLevel };
