/* =========================================================
   BIRTHDAY TIME MACHINE
   random_tech_guy
========================================================= */


/* =========================================================
   MUSIC
========================================================= */

const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const volume = document.getElementById("volume");
const songTitle = document.getElementById("songTitle");

const playlists = {

    "70s": [
        {
            title: "70s Track 01",
            file: "music/70s/song01.mp3"
        },
        {
            title: "70s Track 02",
            file: "music/70s/song02.mp3"
        },
        {
            title: "70s Track 03",
            file: "music/70s/song03.mp3"
        }
    ],

    "80s": [
        {
            title: "Take On Me — a-ha",
            file: "music/80s/a-ha - Take On Me (Official Video) [4K].mp3"
        },
        {
            title: "Livin' on a Prayer — Bon Jovi",
            file: "music/80s/Bon Jovi - Livin' On A Prayer.mp3"
        },
        {
            title: "Eyes Without a Face — Billy Idol",
            file: "music/80s/Billy Idol - Eyes Without A Face.mp3"
        },
        {
            title: "I Just Died in Your Arms — Cutting Crew",
            file: "music/80s/Cutting Crew - (I Just) Died In Your Arms (Official Music Video).mp3"
        },
        {
            title: "Every Breath You Take - The Police ",
            file: "music/80s/ The Police - Every Breath You Take (Official Music Video)"
        }
    ],

    "90s": [
        {
            title: "90s Track 01",
            file: "music/90s/song01.mp3"
        },
        {
            title: "90s Track 02",
            file: "music/90s/song02.mp3"
        },
        {
            title: "90s Track 03",
            file: "music/90s/song03.mp3"
        }
    ]

};


let currentDecade = "80s";
let currentSong = 0;


/* Load a song */

function loadSong() {

    const playlist = playlists[currentDecade];

    if (!playlist || playlist.length === 0) {
        return;
    }

    const song = playlist[currentSong];

    audio.src = song.file;

    songTitle.textContent = song.title;

}


/* Play / pause */

function toggleMusic() {

    if (!audio.src) {
        loadSong();
    }

    if (audio.paused) {

        audio.play()
            .then(() => {
                playButton.textContent = "Ⅱ";
            })
            .catch(() => {

                songTitle.textContent =
                    "Add your music files...";

            });

    } else {

        audio.pause();

        playButton.textContent = "▶";

    }

}


/* Previous */

function previousSong() {

    const playlist = playlists[currentDecade];

    currentSong--;

    if (currentSong < 0) {
        currentSong = playlist.length - 1;
    }

    loadSong();

    audio.play()
        .catch(() => {});

}


/* Next */

function nextSong() {

    const playlist = playlists[currentDecade];

    currentSong++;

    if (currentSong >= playlist.length) {
        currentSong = 0;
    }

    loadSong();

    audio.play()
        .catch(() => {});

}


/* Change decade */

function changeMusicDecade(decade) {

    if (!playlists[decade]) {
        return;
    }

    currentDecade = decade;

    currentSong = 0;

    loadSong();

}


/* Controls */

playButton.addEventListener(
    "click",
    toggleMusic
);

previousButton.addEventListener(
    "click",
    previousSong
);

nextButton.addEventListener(
    "click",
    nextSong
);


volume.addEventListener(
    "input",
    () => {

        audio.volume = volume.value;

    }
);


audio.volume = 0.55;


/* Automatically move to next song */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const target =
        document.getElementById(id);

    if (!target) {
        return;
    }


    target.classList.add("active");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   INTRO
========================================================= */

function startJourney() {

    showScreen("decades");

    createDust();

}


/* =========================================================
   DECADES
========================================================= */

const decadeInfo = {

    "70s": {

        title: "THE 70s",

        icon: "🪩",

        text:
            "Warm lights, vinyl records, disco nights, " +
            "and music that makes you want to dance " +
            "even if nobody asked you to.",

        color: "#c69a52"

    },


    "80s": {

        title: "THE 80s",

        icon: "📻",

        text:
            "Cassette tapes, neon lights, huge choruses, " +
            "and songs that somehow sound even better " +
            "late at night.",

        color: "#c28d4b"

    },


    "90s": {

        title: "THE 90s",

        icon: "📼",

        text:
            "VHS tapes, pixel games, old-school tech, " +
            "and the kind of nostalgia that makes " +
            "everything feel slightly warmer.",

        color: "#ad8148"

    }

};


function showDecade(decade) {

    const data =
        decadeInfo[decade];

    if (!data) {
        return;
    }


    changeMusicDecade(decade);


    const content =
        document.getElementById(
            "decadeContent"
        );


    content.innerHTML = `

        <div class="old-paper">

            <div style="
                font-size: 38px;
                margin-bottom: 12px;
            ">
                ${data.icon}
            </div>

            <h3 style="
                color: ${data.color};
                font-weight: normal;
                font-size: 25px;
                margin-bottom: 12px;
            ">
                ${data.title}
            </h3>

            <p>
                ${data.text}
            </p>

        </div>

    `;


    document
        .getElementById("gameButton")
        .classList.remove("hidden");

    document
        .getElementById("mysteryButton")
        .classList.remove("hidden");

    document
        .getElementById("birthdayButton")
        .classList.remove("hidden");


    /* Small visual flash */

    content.animate(
        [
            {
                opacity: 0,
                transform: "translateY(10px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 500,
            easing: "ease-out"
        }
    );

}


/* =========================================================
   GAME
========================================================= */

const gameArea =
    document.getElementById("gameArea");

const player =
    document.getElementById("player");

const scoreDisplay =
    document.getElementById("score");

const timerDisplay =
    document.getElementById("timer");

const gameMessage =
    document.getElementById("gameMessage");


let playerPosition = 50;

let score = 0;

let timeLeft = 30;

let gameRunning = false;

let gameInterval = null;

let timerInterval = null;

let starInterval = null;


/* Open game */

function openGame() {

    showScreen("game");

}


/* Player movement */

function movePlayer(direction) {

    if (!gameRunning) {
        return;
    }

    playerPosition += direction * 7;

    playerPosition =
        Math.max(
            5,
            Math.min(
                95,
                playerPosition
            )
        );


    player.style.left =
        playerPosition + "%";

}


/* Keyboard controls */

document.addEventListener(
    "keydown",
    event => {

        if (!gameRunning) {
            return;
        }

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            movePlayer(-1);

        }


        if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            movePlayer(1);

        }

    }
);


/* Start game */

function startGame() {

    clearGame();


    score = 0;

    timeLeft = 30;

    playerPosition = 50;

    gameRunning = true;


    scoreDisplay.textContent =
        score;

    timerDisplay.textContent =
        timeLeft;

    player.style.left =
        "50%";


    gameMessage.textContent =
        "Catch as many stars as you can!";


    starInterval = setInterval(
        createFallingStar,
        650
    );


    timerInterval = setInterval(
        () => {

            timeLeft--;

            timerDisplay.textContent =
                timeLeft;


            if (timeLeft <= 0) {

                endGame();

            }

        },
        1000
    );

}


/* Create falling star */

function createFallingStar() {

    if (!gameRunning) {
        return;
    }


    const star =
        document.createElement("div");

    star.className =
        "falling-star";

    star.textContent =
        Math.random() > .5
            ? "⭐"
            : "✦";


    const left =
        Math.random() * 94;


    star.style.left =
        left + "%";

    star.style.top =
        "-30px";


    gameArea.appendChild(star);


    let top = -30;


    const fallSpeed =
        2.2 + Math.random() * 2;


    const fall =
        setInterval(
            () => {

                if (!gameRunning) {

                    clearInterval(fall);

                    star.remove();

                    return;

                }


                top += fallSpeed;

                star.style.top =
                    top + "px";


                if (checkCollision(star)) {

                    score++;

                    scoreDisplay.textContent =
                        score;

                    star.remove();

                    clearInterval(fall);

                    return;

                }


                if (
                    top >
                    gameArea.clientHeight
                ) {

                    star.remove();

                    clearInterval(fall);

                }

            },
            16
        );

}


/* Collision */

function checkCollision(star) {

    const starRect =
        star.getBoundingClientRect();

    const playerRect =
        player.getBoundingClientRect();


    return !(
        starRect.right <
        playerRect.left ||

        starRect.left >
        playerRect.right ||

        starRect.bottom <
        playerRect.top ||

        starRect.top >
        playerRect.bottom
    );

}


/* End game */

function endGame() {

    gameRunning = false;


    clearInterval(
        starInterval
    );

    clearInterval(
        timerInterval
    );


    document
        .querySelectorAll(".falling-star")
        .forEach(star => {
            star.remove();
        });


    let message;


    if (score >= 30) {

        message =
            "ABSOLUTE STAR COLLECTOR. 🌟";

    } else if (score >= 20) {

        message =
            "Okay, you're actually good at this. ⭐";

    } else if (score >= 10) {

        message =
            "Not bad! Pretty solid. ✦";

    } else {

        message =
            "Okay... we might need another attempt 😂";

    }


    gameMessage.textContent =
        `Final score: ${score} — ${message}`;


    createConfetti(60);

}


/* Clear game */

function clearGame() {

    clearInterval(
        starInterval
    );

    clearInterval(
        timerInterval
    );


    document
        .querySelectorAll(".falling-star")
        .forEach(star => {
            star.remove();
        });

}


/* Return from game */

function returnFromGame() {

    clearGame();

    gameRunning = false;

    showScreen("decades");

}


/* =========================================================
   MYSTERY BOXES
========================================================= */

const mysteryMessages = {

    1:
        "Today's mission: have an unnecessarily good day. 😂",

    2:
        "May your playlist never miss. 🎵",

    3:
        "One more year, another chapter. Make it a good one. ✨"

};


function openMysteries() {

    showScreen("mysteries");

}


function openBox(number) {

    const message =
        mysteryMessages[number];


    const messageBox =
        document.getElementById(
            "boxMessage"
        );


    messageBox.textContent =
        message;


    messageBox.animate(
        [
            {
                opacity: 0,
                transform: "translateY(8px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 350
        }
    );


    createConfetti(15);

}


function returnFromMysteries() {

    showScreen("wishes");

}


/* =========================================================
   BIRTHDAY
========================================================= */

function birthday() {

    showScreen("birthday");

    createConfetti(120);

}


/* =========================================================
   CONFETTI
========================================================= */

function createConfetti(amount = 50) {

    const colors = [
        "#d5a653",
        "#b47d38",
        "#ead29a",
        "#8d6230",
        "#f0dfb7"
    ];


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.style.position =
            "fixed";

        piece.style.width =
            "7px";

        piece.style.height =
            "12px";

        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top =
            "-20px";

        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        piece.style.zIndex =
            "200";

        piece.style.pointerEvents =
            "none";


        const duration =
            2.5 +
            Math.random() * 2.5;


        const rotation =
            360 +
            Math.random() * 720;


        piece.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    duration * 1000,

                easing:
                    "cubic-bezier(.2,.7,.3,1)"
            }
        );


        document.body.appendChild(
            piece
        );


        setTimeout(
            () => {
                piece.remove();
            },
            duration * 1000 + 100
        );

    }

}


/* =========================================================
   DUST PARTICLES
========================================================= */

function createDust() {

    const container =
        document.querySelector(
            ".dust-container"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const dust =
            document.createElement("span");


        dust.style.position =
            "fixed";

        dust.style.width =
            "2px";

        dust.style.height =
            "2px";

        dust.style.borderRadius =
            "50%";

        dust.style.background =
            "rgba(255,220,160,.45)";

        dust.style.left =
            Math.random() * 100 + "%";

        dust.style.top =
            Math.random() * 100 + "%";

        dust.style.pointerEvents =
            "none";


        const duration =
            5 +
            Math.random() * 8;


        dust.animate(
            [
                {
                    transform:
                        "translate(0,0)",
                    opacity: 0
                },

                {
                    transform:
                        `translate(
                            ${Math.random() * 100 - 50}px,
                            ${Math.random() * -100 - 30}px
                        )`,
                    opacity: .7
                },

                {
                    transform:
                        `translate(
                            ${Math.random() * 100 - 50}px,
                            ${Math.random() * -200 - 50}px
                        )`,
                    opacity: 0
                }
            ],
            {
                duration:
                    duration * 1000,

                iterations:
                    Infinity,

                delay:
                    Math.random() * -5000
            }
        );


        container.appendChild(
            dust
        );

    }

}


/* =========================================================
   RESTART
========================================================= */

function restart() {

    clearGame();


    score = 0;

    timeLeft = 30;

    gameRunning = false;


    scoreDisplay.textContent =
        "0";

    timerDisplay.textContent =
        "30";


    document
        .getElementById("decadeContent")
        .innerHTML = `

            <div class="old-paper">

                <span class="paper-icon">
                    ✦
                </span>

                <p>
                    Pick a decade above...
                </p>

                <span class="paper-icon">
                    ✦
                </span>

            </div>

        `;


    document
        .getElementById("gameButton")
        .classList.add("hidden");

    document
        .getElementById("mysteryButton")
        .classList.add("hidden");

    document
        .getElementById("birthdayButton")
        .classList.add("hidden");


    showScreen("intro");

}


/* =========================================================
   INITIALIZE
========================================================= */

loadSong();

createDust();


/*
   Start the 80s playlist as the default
   without automatically playing audio.
*/

changeMusicDecade("80s");

