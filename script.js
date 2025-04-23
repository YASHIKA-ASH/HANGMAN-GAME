const wordlist = [
    { word: "bicycle", hint: "A human powered vehicle with two wheels." },
    { word: "planet", hint: "A celestial body orbiting a star." },
    { word: "pencil", hint: "A tool used for writing or drawing, often erasable." },
    { word: "volcano", hint: "A mountain that can erupt with lava and ash." },
    { word: "bridge", hint: "A structure built to span over a river or road." },
    { word: "rainbow", hint: "An arc of colors formed in the sky after rain." },
    { word: "library", hint: "A place where you can borrow books and read quietly." },
    { word: "camera", hint: "A device used to take photographs." },
    { word: "guitar", hint: "A string instrument often used in music bands." },
    { word: "desert", hint: "A hot and dry area with very little rainfall." },
    { word: "rocket", hint: "A vehicle designed to fly in space." },
    { word: "island", hint: "Land completely surrounded by water." },
    { word: "pirate", hint: "A person who robs ships at sea." },
    { word: "mirror", hint: "A surface that reflects an image." },
    { word: "ladder", hint: "A tool used to climb up to higher places." },
    { word: "cookie", hint: "A small sweet baked treat." },
    { word: "compass", hint: "A tool used to find direction." },
    { word: "garden", hint: "A place where plants and flowers are grown." },
    { word: "pillow", hint: "A soft cushion to rest your head on while sleeping." },
    { word: "train", hint: "A vehicle that runs on tracks and transports people or goods." }
];

let currentWord, correctLetters, incorrectguesses;
const maxGuesses = 6;

const hangmanimage = document.querySelector(".hangman img");
const WordDisplay = document.querySelector(".word");
const guessText = document.querySelector(".incorrectguesses b");
const keyboard = document.querySelector(".keyboard");
const lastest = document.querySelector(".last");
const playagainbtn = document.querySelector(".playagain");

const resetgame = () => {
    correctLetters = [];
    incorrectguesses = 0;
    hangmanimage.src = `images/hangman-${incorrectguesses}.svg`;
    guessText.innerText = `${incorrectguesses}/${maxGuesses}`;
    keyboard.querySelectorAll("button").forEach(btn => btn.disabled = false);
    WordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    lastest.classList.remove("show");
};

const getRandomword = () => {
    const { word, hint } = wordlist[Math.floor(Math.random() * wordlist.length)];
    currentWord = word;
    document.querySelector(".hint b").innerText = hint;
    resetgame();
};

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? "You found the word:" : "The correct word was:";
        lastest.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
        lastest.querySelector("h4").innerText = isVictory ? "Congrats!" : "Game Over";
        lastest.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        lastest.classList.add("show");
    }, 300);
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                WordDisplay.querySelectorAll("li")[index].innerText = letter;
                WordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        incorrectguesses++;
        hangmanimage.src = `images/hangman-${incorrectguesses}.svg`;
    }

    guessText.innerText = `${incorrectguesses}/${maxGuesses}`;
    button.disabled = true;

    if (incorrectguesses === maxGuesses) return gameOver(false);
    if ([...WordDisplay.querySelectorAll(".letter.guessed")].length === currentWord.length)
        return gameOver(true);
};

// Create keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboard.appendChild(button);
    button.addEventListener("click", e =>
        initGame(e.target, String.fromCharCode(i))
    );
}

getRandomword();
playagainbtn.addEventListener("click", getRandomword);


