const play = document.querySelector("#play");
const cover = document.querySelector("#cover");
const audio = document.querySelector("#audio");
const title = document.querySelector("#title");

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

const musicContainer = document.querySelector(".music-container");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");

const songs = [
  "Sia - Courage To Change",
  "Sia - The Greatest",
  "Sia - Unstoppable",
  "Sia and David Guetta - Floating Through Space",
];
const loadSongs = (songs) => {
  console.log(songs);
  cover.src = `images/${songs}.jpg`;
  audio.src = `music/${songs}.mp3`;
  title.innerHTML = `${songs}`;
};
let songIndex = 3;
loadSongs(songs[songIndex]);
// playbtn eventlistener
const playSong = () => {
  musicContainer.classList.add("play");
  play.querySelector("i.fas").classList.remove("fa-play");
  play.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};
const pauseSong = () => {
  musicContainer.classList.remove("play");
  play.querySelector("i.fas").classList.add("fa-pause");
  play.querySelector("i.fas").classList.remove("fa-play");
  audio.pause();
};
const prevSong = () => {
  console.log(songIndex);
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songs[songIndex]);
  playSong();
};
const nextSongs = () => {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);

  playSong();
};
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = ` ${progressPercent}%`;
};

function setProgress(e) {
  // console.log(this.clientWidth);
  const width = this.clientWidth;
  const clickX = e.offsetX;
  // console.log(clickX);
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// play.addEventListener("click", playSong(songs));
play.addEventListener("click", () => {
  const isPlay = musicContainer.classList.contains("play");
  if (isPlay) {
    pauseSong();
  } else {
    playSong();
  }
});

// prev and next event
prev.addEventListener("click", prevSong);
next.addEventListener("click", nextSongs);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSongs);
