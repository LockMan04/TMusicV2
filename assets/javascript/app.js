const userIcon = document.querySelector(".hyper-link-item:last-child");
const userMenu = document.querySelector(".user-menu");
const volumeBtn = document.querySelector(".fa-volume-high");
const rangVolume = document.querySelector("#volume");

function clickShow(btn, show) {
  btn.addEventListener("click", () => {
    show.classList.toggle("hidden");

    document.addEventListener("click", (e) => {
      if (!show.contains(e.target) && !btn.contains(e.target)) {
        show.classList.add("hidden");
      }
    });
  });
}

clickShow(volumeBtn, rangVolume);
clickShow(userIcon, userMenu);


// Chữ Chạy
const typedEffect = new Typed("#multiText", {
  strings: [
    "TMusic AppWeb Music Số 1 Việt Nam",
    "Hello",
    "Chill Tý Nhạc Nhé",
    "Khò Khò",
    "Cà Nhính Cà Nhính",
    "Anh Yêu Bé Nhất",
  ],
  loop: true,
  typeSpeed: 80,
  backSpeed: 50,
  backDelay: 10000,
  sunffle: true,
  showCursor: false,
});

/*****************
 * Scroll
 */
const list = document.querySelectorAll(".for-you-list");
let isDragging = false;
let startX;
let scrollLeft;

list.forEach((list) => {
  list.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - list.offsetLeft;
    scrollLeft = list.scrollLeft;
    list.style.cursor = "grabbing";
  });

  list.addEventListener("mouseup", () => {
    isDragging = false;
    list.style.cursor = "grab";
  });

  list.addEventListener("mouseleave", () => {
    isDragging = false;
    list.style.cursor = "grab";
  });

  list.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - list.offsetLeft;
    const walk = x - startX; // Multiplier để tăng tốc độ kéo
    list.scrollLeft = scrollLeft - walk;
  });

  list.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - list.offsetLeft;
    scrollLeft = list.scrollLeft;
  });

  list.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.touches[0].pageX - list.offsetLeft;
    const walk = x - startX; // Multiplier để tăng tốc độ kéo
    list.scrollLeft = scrollLeft - walk;
  });

});

function show(text) {
  Toastify({
    text: text,
    duration: 2000,
    gravity: "top",
    position: "right",
    offset: {
      x: 10,
      y: 40,
    },
    style: {
      background: "var(--green-color)",
      color: "var(--black-color)",
      borderRadius: "6px",
      textWrap: "nowrap",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}

getSongJson();
window.onload = () => { 
  document.querySelector(".load-container").style.display = "none";
  app.start();
};
