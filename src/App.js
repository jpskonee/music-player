import React, {useState, useRef} from "react";
import Player from './components/Player';
import Song from './components/Song';
import songLists from "./songlist";
import "../src/styles/app.scss";
import Library from "./components/Library";
import Nav from "./components/Nav";

function App() {

  
  const [play, setPlay] = useState(false);
  const [songs, setSongs] = useState(songLists());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const audioRef = useRef(null);

   //libary toggle
  const [libOpen, setLibOpen] = useState(true);
  
  //selections
  const [repeatAllSong, setRepeatAllSong] = useState(true);
  const [repeatOneSong, setRepeatOneSong] = useState(false);
  const [randomSelection, setRandomSelection] = useState(false);

  //beat hertz git
  const [beatGif, setBeatGif] = useState(false);

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0
  });

  
 
  
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    const roundedCurrent = Math.floor(current);
    const roundedDuration = Math.floor(duration);

    const playedPercent = Math.floor((roundedCurrent / roundedDuration) * 100);

   
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration: duration,
      animationPercent: playedPercent
    });
  };

  //music selection
  const musicEndHandler = async () => {
    if (repeatAllSong) {
      const getIndex = await songs.findIndex((song) => song.id === currentSong.id);
     setCurrentSong(songs[(getIndex + 1) % songs.length])
      if (play) {
        audioRef.current.play();
      }
      return;
    }

    if (randomSelection) {
      const randomSongPosition = Math.floor((Math.random() * songs.length)) 
      console.log(randomSongPosition)
      setCurrentSong(songs[randomSongPosition])
      if (play) {
        audioRef.current.play();
      }
      return;
    }

    if (repeatOneSong) {
      if (play) {
        audioRef.current.play();
      }
      return;
    }

    setPlay(!play)
  }
    
  return (
    <div className={`app ${!libOpen && "library-active"}`} style={{background:'url("https://www.transparenttextures.com/patterns/food.png")'}}>
      <Nav
        libOpen = {libOpen}
        setLibOpen = {setLibOpen}
      />
      <Song
        currentSong={currentSong}
        beatGif={beatGif}
        />
      <Player
        play={play}
        currentSong={currentSong}
        setPlay={setPlay}
        audioRef={audioRef}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
        songs={songs}
        setSongs= {setSongs}
        setCurrentSong={setCurrentSong}
        libOpen={libOpen}
        setLibOpen={setLibOpen}
        repeatAllSong={repeatAllSong}
        setRepeatAllSong={setRepeatAllSong}
        repeatOneSong={repeatOneSong}
        setRepeatOneSong={setRepeatOneSong}
        randomSelection={randomSelection}
        setRandomSelection={setRandomSelection}
        beatGif={beatGif}
        setBeatGif={setBeatGif}
      />
      <Library
        audioRef={audioRef}
        setPlay={setPlay}
        play={play}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        libOpen={libOpen}
        currentSong={currentSong}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedData={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={musicEndHandler}
      >
      </audio>
    </div>
  );
};

export default App;
 