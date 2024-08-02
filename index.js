document.addEventListener("DOMContentLoaded", function () {
  if (!localStorage.getItem("Score")) {
    localStorage.setItem("Score", 0);
  }
  getElement("#score").textContent = localStorage.getItem("Score");
  let wrapper = getElement(".wrapper");
  let rules_button = getElement(".rules-button");
  let overlay = getElement(".overlay");
  const overlay_close_btn = getElement(".overlay__close-button");
  const wrapper_body = getElement(".wrapper__body");
  const text_box = getElement(".wrapper__body__text-box");
  const machine_choice = getElement(".machine--choice");
  const my_choice = getElement(".my--choice");
  let userChoiceOption = null;
  let systemChoiceOption = null;
  const RPS = ["Rock", "Paper", "Scissor"];

  function playAgainButton() {
    const button = document.createElement("button");
    button.textContent = "Play Again";
    button.classList.add("play--again");
    button.onclick = function () {
      location.reload();
      getElement(".span--center").style.display = "none";
    };
    return button;
  }
  function generateChoice() {
    systemChoiceOption = RPS[Math.floor(Math.random() * RPS.length)];
    console.log(
      "🚀 ~ generateChoice ~ systemChoiceOption:",
      systemChoiceOption
    );
    const div = document.createElement("div");
    const image = document.createElement("img");
    switch (systemChoiceOption) {
      case "Rock":
        image.src = "./images/icon-rock.svg";
        div.classList.add("common-rock-style");
        break;
      case "Paper":
        image.src = "./images/icon-paper.svg";
        div.classList.add("common-paper-style");
        break;
      case "Scissor":
        image.src = "./images/icon-scissors.svg";
        div.classList.add("common-scissors-style");
        break;
      default:
        console.log("I am in error case on naming image");
        break;
    }
    div.classList.add("common-style");
    div.classList.add("system--choice");
    div.appendChild(image);
    wrapper_body.appendChild(div);
  }

  function showOverlay() {
    if (overlay.classList.contains("show")) {
      overlay.classList.add("hide");
      overlay.classList.remove("show");
    }
    rules_button.disabled = false;
    wrapper.style.opacity = 1;
    rules_button.style.cursor = "pointer";
  }

  function showPlayStatus(text) {
    getElement(".span--center").style.display = "block";
    getElement(".span--center").textContent = text;
  }

  function decideWinLose() {
    let win_count = parseInt(localStorage.getItem("Score"), 10) || 0;
    let system_choice = RPS.indexOf(systemChoiceOption);
    let user_choice = RPS.indexOf(userChoiceOption);
    if (system_choice === user_choice) {
      showPlayStatus("draw");
      return;
    }
    if (user_choice === 0 && system_choice === 2) {
      win_count += 1;
      localStorage.setItem("Score", win_count);
      getElement("#score").textContent = localStorage.getItem("Score");
      showPlayStatus("you win");
      return;
    } else if (user_choice === 1 && system_choice === 0) {
      win_count += 1;
      localStorage.setItem("Score", win_count);
      getElement("#score").textContent = localStorage.getItem("Score");
      showPlayStatus("you win");
      return;
    } else if (user_choice === 2 && system_choice === 1) {
      win_count += 1;
      localStorage.setItem("Score", win_count);
      getElement("#score").textContent = localStorage.getItem("Score");
      showPlayStatus("you win");
      return;
    } else {
      showPlayStatus("you lose");
      return;
    }
  }
  function winLoseText() {
    const span = document.createElement("span");
    span.classList.add("span--center", "hide");
    span.textContent = "Some";
    return span;
  }
  function hideOverlay() {
    if (overlay.classList.contains("hide")) {
      overlay.classList.add("show");
      overlay.classList.remove("hide");
    }
    wrapper.style.opacity = 0.1;
    rules_button.disabled = true;
    rules_button.style.cursor = "default";
  }
  function hideShow(element) {
    element.classList.toggle("hide");
  }
  function clickHandler(event) {
    if (event.target === wrapper_body) {
      return null;
    }
    const paperImage = event.target.closest(".wrapper__body__paper-image");
    const rockImage = event.target.closest(".wrapper__body__rock-image");
    const scissorsImage = event.target.closest(
      ".wrapper__body__scissors-image"
    );
    if (paperImage) {
      userChoiceOption = "Paper";
      showClickImage(paperImage);
    } else if (rockImage) {
      userChoiceOption = "Rock";
      showClickImage(rockImage);
    } else if (scissorsImage) {
      userChoiceOption = "Scissor";
      showClickImage(scissorsImage);
    }
  }
  function placeholderImage() {
    let div = document.createElement("div");
    div.classList.add("placeholder-image");
    return div;
  }
  function showClickImage(imageElement) {
    const clonedElement = imageElement.cloneNode(true);
    wrapper_body.style.background = "none";
    clonedElement.classList.add("user--choice");
    clonedElement.style.cursor = "default";
    wrapper_body.removeEventListener("click", clickHandler);
    Array.from(wrapper_body.children).forEach((child) => {
      if (child !== text_box) {
        wrapper_body.removeChild(child);
      } else {
        child.classList.add("align--textBox");
        hideShow(machine_choice);
        hideShow(my_choice);
      }
    });
    wrapper_body.appendChild(clonedElement);
    wrapper_body.appendChild(placeholderImage());
    setTimeout(function () {
      wrapper_body.appendChild(winLoseText());
      generateChoice();
      decideWinLose();
      wrapper_body.appendChild(playAgainButton());
    }, 3000);
  }
  function getElement(element) {
    return document.querySelector(element);
  }
  wrapper_body.addEventListener("click", clickHandler);
  document.body.addEventListener("click", function (event) {
    let clickedElement = event.target;
    if (clickedElement === rules_button) {
      return null;
    }
    if (!overlay.contains(clickedElement)) {
      showOverlay();
    }
  });
  overlay_close_btn.addEventListener("click", function () {
    showOverlay();
  });
  rules_button.addEventListener("click", function () {
    hideOverlay();
  });
});
