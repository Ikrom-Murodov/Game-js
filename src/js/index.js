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
  }

  gameLaunchButtonHandler() {
    this.gameLaunchButton.parentNode.classList.add("hide");
    this.gameField.classList.add("gameFieldStyle");
    this.gameTimeDisplay.textContent = this.gameTimeDisplaySettings.value;
    this.gameTimer();
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
