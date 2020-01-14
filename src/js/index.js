"use strict";

class Game {
  constructor(gameSettings) {
    this.gameLaunchButton = gameSettings.gameLaunchButton;
    this.gameField = gameSettings.gameField;
    this.gameTimeDisplay = gameSettings.gameTimeDisplay;
    this.gameTimeDisplaySettings = gameSettings.gameTimeDisplaySettings;

    this.init();
  }

  init() {
    this.gameLaunchButton.addEventListener("click", () => {
      this.gameLaunchButtonHandler();
    });

    this.gameTimeDisplaySettings.addEventListener("change", () => {
      this.gameTimeDisplaySettingsHandler();
    });

    this.gameField.addEventListener("click", event => {
      this.gameFieldHandler(event);
    });
  }

  gameLaunchButtonHandler() {
    this.gameLaunchButton.parentNode.classList.add("hide");
    this.gameField.classList.add("gameFieldStyle");
    this.gameTimeDisplay.textContent = this.gameTimeDisplaySettings.value;
    this.gameTimer();
    this.randomSquares();
  }

  gameTimer() {
    const interval = setInterval(() => {
      const time = this.gameTimeDisplay.textContent;
      if (time <= 0) {
        this.gameOver();
        clearInterval(interval);
      } else {
        this.gameTimeDisplay.textContent = (time - 0.1).toFixed(1);
      }
    }, 100);
  }

  gameOver() {
    this.gameField.innerText = "";
    this.gameLaunchButton.parentNode.classList.remove("hide");
    this.gameField.classList.remove("gameFieldStyle");
  }

  gameTimeDisplaySettingsHandler() {
    const time = Number(this.gameTimeDisplaySettings.value);
    if (time <= 0) {
      this.gameTimeDisplay.textContent = (5).toFixed(1);
      this.gameTimeDisplaySettings.value = 5;
    } else {
      this.gameTimeDisplay.textContent = time.toFixed(1);
    }
    // this.gameTimeTitleStartStyle();
  }

  randomSquares() {
    this.gameField.innerText = "";
    const box = document.createElement("div");
    const boxSize = this.getRandomNumber(20, 60);
    const gameSize = this.gameField.getBoundingClientRect();
    const maxTop = gameSize.height - boxSize;
    const maxLeft = gameSize.width - boxSize;
    box.style.width = box.style.height = `${boxSize}px`;
    box.style.top = this.getRandomNumber(0, maxTop) + "px";
    box.style.left = this.getRandomNumber(0, maxLeft) + "px";
    box.style.backgroundColor = this.getRandomColor();
    box.classList.add("randomSquaresStyle");
    box.setAttribute("box", "true");
    this.gameField.appendChild(box);
  }

  gameFieldHandler(event) {
    if (event.target.hasAttribute("box")) {
      this.gameCounter++;
      this.randomSquares();
    }
  }

  getRandomNumber(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

const game = new Game({
  gameLaunchButton: document.querySelector(
    ".header-content__button-start-game"
  ),
  gameField: document.querySelector(".header-content__wrapper-game-fields"),
  gameTimeDisplay: document.querySelector(".header-content__time-game"),
  gameTimeDisplaySettings: document.querySelector(
    ".header-content__settings-game-time"
  )
});
