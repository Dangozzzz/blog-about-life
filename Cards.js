const unsplashIds = [
    "FV3GConVSss",
    "JaXs8Tk5Iww",
    "UV81E0oXXWQ",
    "MNz7IGrcEl0",
    "tleCJiDOri0",
    "JdcJn85xD2k",
    "nhWgZNV85LQ",
    "UXFJ-6Zj27M",
    "98WE9hWWjiQ",
    "3mlg5BRUifM",
    "_B9J6abAHPA",
    "VOS6akpHo1k",
    "f7h2nTvEknM",
    "RBoGC_OJvWs",
    "GliaHAJ3_5A"
  ];
  
  const cards = document.querySelectorAll(".card");
  const cardsContainer = document.querySelector("#cards");
  const favoriteIcon = document.getElementById("favMenuItem");
  
  function getCard(element) {
    if (element.classList.contains("card")) {
      return element;
    } else if (element !== document.documentElement) {
      return getCard(element.parentElement);
    }
  }
  
  function getButton(element) {
    if (element.tagName === "BUTTON") {
      return element;
    } else if (element !== document.documentElement)
      return getButton(element.parentElement);
  }
  
  function getImg(card) {
    if (!(card instanceof Element && card.classList.contains("card"))) return;
    return card.querySelector("img");
  }
  
  function appear(card) {
    const id = Math.floor(Math.random() * unsplashIds.length);
    const cardImg = getImg(card);
    const src = `https://source.unsplash.com/${unsplashIds[id]}/240x180`;
    card.classList.remove("card_hidden");
    cardImg.setAttribute("src", src);
  }
  
  function reset(card) {
    const cardImg = getImg(card);
    cardImg.setAttribute("src", "");
    cardImg.parentElement.classList.remove("card__image_loaded");
    card.classList.add("card_hidden");
    card.classList.remove("card_favorited");
    setTimeout(() => {
      appear(card);
    }, 400);
  }
  
  function like(card) {
    const animationDuration = 1000;
    const distance = getDistance(card, favoriteIcon);
    card.classList.add("card_favorited");
    favoriteIcon.animate([{ transform: "translateZ(700px)", offset: 0.5 }], {
      duration: animationDuration,
      easing: "ease-in-out"
    });
    const animation = card.animate(
      [
        {
          transform: `translate(${distance.x}px, ${distance.y}px) scale(0.2) rotate(-40deg)`
        }
      ],
      { duration: animationDuration / 2, easing: "ease-in" }
    );
  
    animation.onfinish = () => {
      reset(card);
    };
  }
  
  function dislike(card) {
    const animation = card.animate(
      [
        {
          transform: "scale(0.1) rotate(-130deg)",
          opacity: 0
        }
      ],
      { duration: 400, easing: "ease-in-out" }
    );
  
    animation.onfinish = () => {
      reset(card);
    };
  }
  
  function buttonHandler(event) {
    const card = getCard(event.target);
    const button = getButton(event.target);
  
    if (!card || !button || !button.dataset) return;
    if (button.dataset.action === "like") like(card);
    if (button.dataset.action === "dislike") dislike(card);
  }
  
  function getDistance(elt1, elt2) {
    if (!(elt1 instanceof Element && elt2 instanceof Element))
      throw Error("Illegal use of the function");
  
    const elt1Bbox = elt1.getBoundingClientRect();
    const elt2Bbox = elt2.getBoundingClientRect();
  
    return { x: elt2Bbox.x - elt1Bbox.x, y: elt2Bbox.y - elt1Bbox.y };
  }
  
  function init() {
    cardsContainer.addEventListener("click", buttonHandler);
  
    [...cards].forEach((card, index) => {
      const cardImg = getImg(card);
      cardImg.addEventListener("load", () => {
        cardImg.parentElement.classList.add("card__image_loaded");
      });
  
      setTimeout(() => {
        appear(card);
      }, 200 + index * 50);
    });
  }
  
  window.addEventListener("DOMContentLoaded", init);
  