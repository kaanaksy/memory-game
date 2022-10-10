const section = document.querySelector("section");
// Lives Counting
const livesCount = document.querySelector("span");
let lives = 5;

livesCount.textContent = lives;

//Generating Card Datas

const getData = () => [
    { imgSrc: "./pngs/captain-america.png", name: "captain-america" },
    { imgSrc: "./pngs/firestar.png", name: "firestar" },
    { imgSrc: "./pngs/hulk.png", name: "hulk" },
    { imgSrc: "./pngs/iron-man.png", name: "iron-man" },
    { imgSrc: "./pngs/justice.png", name: "justice" },
    { imgSrc: "./pngs/scarlet-witch.png", name: "scarlet-witch" },
    { imgSrc: "./pngs/thor.png", name: "thor" },
    { imgSrc: "./pngs/vision.png", name: "vision" },
    { imgSrc: "./pngs/captain-america.png", name: "captain-america" },
    { imgSrc: "./pngs/firestar.png", name: "firestar" },
    { imgSrc: "./pngs/hulk.png", name: "hulk" },
    { imgSrc: "./pngs/iron-man.png", name: "iron-man" },
    { imgSrc: "./pngs/justice.png", name: "justice" },
    { imgSrc: "./pngs/scarlet-witch.png", name: "scarlet-witch" },
    { imgSrc: "./pngs/thor.png", name: "thor" },
    { imgSrc: "./pngs/vision.png", name: "vision" }
  ];

// Shuffling

const shuffle = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Generation

const cardGenerator = () => {
  const cardData = shuffle();
  // Instead of index.html creating in app.js
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");

    card.classList = "card";
    face.className = "face";
    back.classList = "back";

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle("toggleCard");
      check(e);
    });
  });
};

// True or False ?

const check = (e) => {
  const toggledCard = e.target;
  toggledCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") === flippedCard[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCard.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      lives --;
      livesCount.textContent = lives;
      if (lives === 0) {
        restart(window.alert("You have failed this game! Try Again"));
      }
    };
  };
  if (toggleCard.length === 16) {
    restart(window.alert("You won!"));
  }
};

// Restart the Game

const restart = (text) => {
  let cardData = shuffle();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");
    // Shuffle
    setTimeout(() => {
      cards[index].style.pointerEvents = "all"
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  lives = 5;
  livesCount.textContent = lives;
  setTimeout(() => {
    window.alert(text), 100
  }, timeout);
};

cardGenerator();
