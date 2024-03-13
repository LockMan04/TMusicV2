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

songs = [
  {
    name: "nếu lúc đó",
    type: "Bài hát",
    singer: "tlinh, 2pillz",
    path: "./assets/music/songs/NeuLucDo-tlinh2pillz-8783613.mp3",
    image: "./assets/music/img-songs/neulucdo.jpg",
  },
  {
    name: "Anh Nhớ Ra",
    type: "Bài hát",
    singer: "Vũ ft.Trang",
    path: "./assets/music/songs/Anh Nhớ Ra (feat. TRANG) - Vũ..mp3",
    image: "./assets/music/img-songs/Anh Nhớ Ra (feat. TRANG) - Vũ..jpg",
  },
  {
    name: "Anh Đã Ổn Hơn",
    type: "Bài hát",
    singer: "MKC",
    path: "./assets/music/songs/AnhDaOnHon-MCK-8804113.mp3",
    image: "./assets/music/img-songs/anh da on hon.jpg",
  },
  {
    name: "Chìm Sâu",
    type: "Bài hát",
    singer: "RPT MKC",
    path: "./assets/music/songs/Chìm Sâu - RPT MCK.mp3",
    image: "./assets/music/img-songs/Chìm Sâu - RPT MCK.jpg",
  },
  {
    name: "Chuyện Đôi Ta",
    type: "Bài hát",
    singer: "Emcee L(Da LAB), ft.Muộii",
    path: "./assets/music/songs/Chuyện Đôi Ta (feat. Muộii) - Emcee L (Da LAB).mp3",
    image:
      "./assets/music/img-songs/Chuyện Đôi Ta (feat. Muộii) - Emcee L (Da LAB).jpg",
  },
  {
    name: "Ghệ Đẹp",
    type: "Bài hát",
    singer: "Cain",
    path: "./assets/music/songs/Ghệ Đẹp - Cain.mp3",
    image: "./assets/music/img-songs/Ghệ Đẹp - Cain.jpg",
  },
  {
    name: "ghệ iu dấu của em ơi",
    type: "Bài hát",
    singer: "tlinh",
    path: "./assets/music/songs/ghệ iu dấu của em ơi - tlinh.mp3",
    image: "./assets/music/img-songs/ghệ iu dấu của em ơi - tlinh.jpg",
  },
  {
    name: "Sinh Ra Đã Là Thứ Đối Lập Nhau",
    type: "Bài hát",
    singer: "Emcee L (Da LAB), ft.Badbies",
    path: "./assets/music/songs/Sinh Ra Đã Là Thứ Đối Lập Nhau (feat. Badbies) - Emcee L (Da LAB).mp3",
    image:
      "./assets/music/img-songs/Sinh Ra Đã Là Thứ Đối Lập Nhau (feat. Badbies) - Emcee L (Da LAB).jpg",
  },
  {
    name: "Trước Khi Em Tồn Tại",
    type: "Bài hát",
    singer: "Thắng",
    path: "./assets/music/songs/Trước Khi Em Tồn Tại - Thắng.mp3",
    image: "./assets/music/img-songs/Trước Khi Em Tồn Tại - Thắng.jpg",
  },
  {
    name: "Waitting For You",
    type: "Bài hát",
    singer: "MONO",
    path: "./assets/music/songs/Waiting For You - MONO.mp3",
    image: "./assets/music/img-songs/Waiting For You - MONO.jpg",
  },
  {
    name: "She Said",
    type: "Bài hát",
    singer: "WEAN, NAOMI",
    path: "./assets/music/songs/She Said - WEAN, NAOMI - NhacHay360.mp3",
    image: "./assets/music/img-songs/she said.jpg",
  },
];

const app = {
  songs: songs,
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
        show('Đang lặp lại bài hát này');
      } else {
        app.isRepeat = false;
        audio.loop = false;
        repeatBtn.style.color = "var(--white-color)";
        show('Đã tắt lặp lại');
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

app.start();

