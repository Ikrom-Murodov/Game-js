"use strict";

class Game {
  constructor(gameSettings) {
    this.gameLaunchButton = gameSettings.gameLaunchButton;
    this.gameField = gameSettings.gameField;
    this.gameTimeDisplay = gameSettings.gameTimeDisplay;

    this.init();
  }

  init() {
    this.gameLaunchButton.addEventListener("click", () => {
      this.gameLaunchButtonHandler();
    });
  }

  gameLaunchButtonHandler() {
    this.gameLaunchButton.parentNode.classList.add("hide");
    this.gameField.classList.add("gameFieldStyle");
    this.gameTimer()
  }

  gameTimer() {
    const interval = setInterval(() => {
      const time = this.gameTimeDisplay.textContent;
      if (time <= 0) {
        clearInterval(interval);
      } else {
        this.gameTimeDisplay.textContent = (time - 0.1).toFixed(1);
      }
    }, 100);
  }
}

const game = new Game({
  gameLaunchButton: document.querySelector(
    ".header-content__button-start-game"
  ),
  gameField: document.querySelector(".header-content__wrapper-game-fields"),
  gameTimeDisplay: document.querySelector(".header-content__time-game")
});
