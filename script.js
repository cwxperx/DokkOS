const hackButton = document.getElementById("hackButton");
const videoStage = document.getElementById("videoStage");
const hackVideo = document.getElementById("hackVideo");
const exitVideo = document.getElementById("exitVideo");

function openVideo() {
  videoStage.classList.add("active");
  videoStage.setAttribute("aria-hidden", "false");
  document.body.classList.add("video-open");
  hackVideo.currentTime = 0;

  const playPromise = hackVideo.play();
  if (playPromise) {
    playPromise.catch(() => {});
  }
}

function closeVideo() {
  hackVideo.pause();
  videoStage.classList.remove("active");
  videoStage.setAttribute("aria-hidden", "true");
  document.body.classList.remove("video-open");
}

hackButton.addEventListener("click", openVideo);
exitVideo.addEventListener("click", closeVideo);
hackVideo.addEventListener("ended", closeVideo);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoStage.classList.contains("active")) {
    closeVideo();
  }
});
