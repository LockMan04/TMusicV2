const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const audio = $("#audio-player");
const imgAudio = $(".song-playing-img img");
const songName = $(".song-playing-title-namesong");
const singerName = $(".name-singer");
const playBtn = $(".fa-play");
const nextBtn = $(".fa-forward-step");
const prevBtn = $(".fa-backward-step");
const repeatBtn = $(".fa-repeat");
const rangeMusic = $("#music-range");
const musicCurrentTime = $("#music-duration");
const musicCurrentTimeEnd = $("#music-duration-end");

  function getSongJson() {
    const songs = new XMLHttpRequest();
    songs.open("GET", "./assets/json/songs.json");
    songs.send();

    songs.onload = function() {
      if (songs.status === 200) {
        const response = JSON.parse(songs.responseText);
        app.songs = response;
        app.start();
      } else {
        console.error("Failed to load songs.json");
      }
    };
  };

const app = {
  songs: {},
  currentIndex: 5,
  isPlaying: false,
  isRepeat: false,

  loadSong: () => {
    imgAudio.src = app.songs[app.currentIndex].image;
    songName.textContent = app.songs[app.currentIndex].name;
    singerName.textContent = app.songs[app.currentIndex].singer;
    audio.src = app.songs[app.currentIndex].path;

    playBtn.onclick = () => {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    nextBtn.onclick = () => {
      app.currentIndex++;
      if (app.currentIndex > app.songs.length - 1) {
        app.currentIndex = 0;
      }
      app.loadSong();
      audio.play();
    };

    prevBtn.onclick = () => {
      app.currentIndex--;
      if (app.currentIndex < 0) {
        app.currentIndex = app.songs.length - 1;
      }
      app.loadSong();
      audio.play();
    };

    repeatBtn.onclick = () => {
      if (!app.isRepeat) {
        app.isRepeat = true;
        repeatBtn.style.color = "var(--green-color)";
        audio.loop = true;
        show("Đang lặp lại bài hát này");
      } else {
        app.isRepeat = false;
        audio.loop = false;
        repeatBtn.style.color = "var(--white-color)";
        show("Đã tắt lặp lại");
      }
    };

    audio.onplay = () => {
      app.isPlaying = true;
      playBtn.classList.replace("fa-play", "fa-pause");
    };

    audio.onpause = () => {
      app.isPlaying = false;
      playBtn.classList.replace("fa-pause", "fa-play");
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        rangeMusic.value = progressPercent;
      }

      const durationTime = audio.currentTime;
      const m = Math.floor(durationTime / 60);
      const s = Math.floor(durationTime % 60);
      const minute = m < 10 ? `0${m}` : m;
      const second = s < 10 ? `0${s}` : s;

      musicCurrentTime.textContent = `${minute}:${second}`;

      if (audio.ended) {
        app.currentIndex++;
        if (app.currentIndex > app.songs.length - 1) {
          app.currentIndex = 0;
        }
        app.loadSong();
        audio.play();
      }
    };

    audio.ondurationchange = () => {
      const durationTime = audio.duration;
      const minute = Math.floor(durationTime / 60);
      const second = Math.floor(durationTime % 60);
      musicCurrentTimeEnd.textContent = `${minute}:${second}`;
    };

    rangeMusic.oninput = (e) => {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
      audio.play();
    };
  },

  testing: () => {
    localStorage.setItem("audioDuration", audio.duration);
    // console.log(localStorage.getItem('audioDuration'));
  },

  start: () => {
    app.loadSong();
    app.testing();
  },
};

getSongJson();
app.start();
