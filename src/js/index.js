"use strict";

class Game {
  constructor(gameSettings) {
    this.gameLaunchButton = gameSettings.gameLaunchButton;
    this.gameField = gameSettings.gameField;

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
  }


}

const game = new Game({
  gameLaunchButton: document.querySelector(
    ".header-content__button-start-game"
  ),
  gameField: document.querySelector(".header-content__wrapper-game-fields")
});
