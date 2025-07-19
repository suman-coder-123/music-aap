const songItem = document.querySelectorAll(".songItem");
const playerCard = document.getElementById("playerCard");
const playerSongName = document.getElementById("playerSongName");
const playerSinger = document.getElementById("playerSinger");
const playerCover = document.getElementById("playerCover");
const mainAudio = document.getElementById("mainAudio"); 
const playpauseIcon = document.getElementById("playpauseIcon"); 
const playpauseBtn = document.getElementById("playpause");   
const progressBtn = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");    
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");      

let currentIndex = -1;

songItem.forEach(items => {
    const playBtn = items.querySelector(".songItemPlay");
    playBtn.addEventListener("click", () => {

        const src = items.getAttribute("data-src");
        const title = items.querySelector('.songName').innerText;
        const coverSrc = items.querySelector('img').src;
        mainAudio.src= src;
        playerSongName.innerText=title;
        playerCover.src= coverSrc;
        

        playerCard.style.display='block';
        mainAudio.play();
        playpauseIcon.className = "fa fa-pause"; 
        });
});

prevBtn.addEventListener("click" , () => {
    if (currentIndex>0) {
        songItem[currentIndex-1].querySelector(".songItemPlay").click();
    }
});


playpauseBtn.addEventListener("click", () => {
  if (mainAudio.paused) {
    mainAudio.play();
    playpauseIcon.className = "fa fa-pause";
  } else {
    mainAudio.pause();
    playpauseIcon.className = "fa fa-play";
  }
});

nextBtn.addEventListener("click" , () => {
    if (currentIndex<songItem.length-1) {
        songItem[currentIndex+1].querySelector(".songItemPlay").click();
    }
})


mainAudio.addEventListener("timeupdate", () => {
    if (mainAudio.duration) {
        const percent = (mainAudio.currentTime / mainAudio.duration) * 100;
        progressBtn.style.width = percent + "%";
    }
});
progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = mainAudio.duration;

    // Update currentTime of audio
    mainAudio.currentTime = (clickX / width) * duration;
});

mainAudio.addEventListener("ended" , () => {
    if (currentIndex<songItem.length-1) {
        songItem[currentIndex+1].querySelector(".songItemPlay").click();
    } else {
        mainAudio.currentIndex=0;
        playpauseIcon.className="fa-fa-play";
    }
})
