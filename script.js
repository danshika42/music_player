const musicConatiner=document.querySelector('.music-container');   
const playBtn=document.querySelector('#play');   
const prevBtn=document.querySelector('#prev');   
const nextBtn=document.querySelector('#next');   
const audio=document.querySelector('#audio');   
const progress=document.querySelector('.progress');   
const progressConatiner=document.querySelector('.progress-container');   
const title=document.querySelector('#title');   
const cover=document.querySelector('#cover');   


// song 

const songs=['Kinna Sona','Teri Meri Ladayi','Mann Mera']

// keep track of songs

let songIndex=0;

// initially load song info DOM

loadSong(songs[songIndex])

// update song details

function loadSong(song){
    title.innerHTML=song;
    audio.src=`music/${song}.mp3`
    cover.src=`img/${song}.jpeg`
    //audio.play()

}

function playSong(){
    musicConatiner.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()

}

function pauseSong(){
    musicConatiner.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1
    } 
    loadSong(songs[songIndex])
    playSong()
}
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0
    } 
    loadSong(songs[songIndex])
    playSong()
}
function updateProgress(e){
    const {duration, currentTime}=e.srcElement;
    const progressPercent= (currentTime/duration) * 100;
    progress.style.width=`${progressPercent}%`

}

function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration =audio.duration;

    audio.currentTime=(clickX/width)*duration
}

// event listeners

playBtn.addEventListener('click',()=>{
    const isPlaying = musicConatiner.classList.contains('play')

    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    } 

})

//  change song event 

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)
progressConatiner.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);