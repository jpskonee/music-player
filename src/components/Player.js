import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faStepBackward, faStepForward, faPause } from "@fortawesome/free-solid-svg-icons";
import { playAuido } from "../components/playAuido";
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';




const Player = (props) => {
    const { songs, setSongs, repeatAllSong, setRepeatAllSong, setCurrentSong, currentSong, audioRef, play, setPlay, songInfo, setSongInfo, repeatOneSong, setRepeatOneSong, randomSelection, setRandomSelection, libOpen,  setLibOpen, setBeatGif } = props

    const [volume, setVolume] = useState(0.7);
    const [volumeBar, setVolumeBar] = useState(false);
    
    
    const playSongHandler = (event) => {
        if (!play) {
            audioRef.current.play();
            setPlay(!play);
            setTimeout(() => {
                setBeatGif(true)
            }, 2500);
        } else {
            audioRef.current.pause();
            setPlay(!play);
            setBeatGif(false)
        }
    };

   
    const timeFormater = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    };

    const skipTrackHandle = async (direction) => {

        const getIndex = await songs.findIndex((song) => song.id === currentSong.id);
        
        const songListLength = songs.length
        
        if (direction === "skipBack") {
            if ((getIndex - 1) % songListLength < 0) {
                setCurrentSong(songs[songListLength - 1]);
                playAuido(play, audioRef)
                setBeatGif(false)
                setTimeout(() => {
                setBeatGif(true)
            }, 2500);
                return;
            }
            setCurrentSong(songs[(getIndex - 1) % songListLength]);
            setBeatGif(false)
                setTimeout(() => {
                setBeatGif(true)
            }, 2500);
        } else if (direction === "skipForward") {
            setCurrentSong(songs[(getIndex + 1) % songListLength]);
        };
        playAuido(play, audioRef)
        setBeatGif(false)
                setTimeout(() => {
                setBeatGif(true)
            }, 2500);
    };

    const dragHandler = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setSongInfo({
            ...songInfo,
            currentTime: newTime
        });
    };
    //eslint-disable-next-line

    //add animation
    const trackAnimation = {
        transform: `translateX(${songInfo.animationPercent}%)`
    }

    //track player bg colour
    const trackBgColour = {
        background: `linear-gradient(to right, ${currentSong.colour[0]}, ${currentSong.colour[1]})`
    };

    const playListHandler = () => {
        setLibOpen(!libOpen);
    }
    
    const changeVolumeHandler = (e) => {
        const selectedVol = e.target.value
        setVolume(selectedVol / 100)
        if (selectedVol <= 0.1) {
            setVolume(0.00)
        }
        audioRef.current.volume = volume
        setTimeout(() => {
            setVolumeBar(false)
        }, 3000);
    };

    const volumeHandler = () => {
        setVolumeBar(true)
    }

    const randomSelectionHandler = () => {
        setRandomSelection(!randomSelection)
        setRepeatOneSong(false)
        setRepeatAllSong(false)
    }

    const repeatAllSongHandler = () => {
        setRepeatAllSong(!repeatAllSong)
        setRepeatOneSong(false)
        setRandomSelection(false)
    }

    const repeatOneSongHandler = () => {
        setRepeatOneSong(!repeatOneSong)
        setRepeatAllSong(false)
        setRandomSelection(false)
    }

    useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
                return (
                    {
                        ...song,
                        active: true
                    }
                )
            } else {
                return (
                    {
                        ...song,
                        active: false
                    }
                )
            }
        });
        setSongs(newSongs);
        //eslint-disable-next-line
    }, [currentSong]);  //eslint-disable-next-line

    return (
        <div className="player">
            <div className="time-control">
                <p> {timeFormater(songInfo.currentTime)} </p>
                <div className="track" style={trackBgColour}>
                    <input
                        min="0"
                        max={songInfo.duration || 0}
                        type="range"
                        value={songInfo.currentTime}
                        onChange={dragHandler}
                    />
                    <div className="track-cover" style={trackAnimation}> </div>
                </div>
                <p> {songInfo.duration ? timeFormater(songInfo.duration) : "0:00"}  </p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="step-backward"
                    icon={faStepBackward}
                    onClick={() => skipTrackHandle("skipBack")}
                />
                {/* <FontAwesomeIcon className="backward" size="2x" icon={faBackward} /> */}
                <div>  <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={play ? faPause : faPlayCircle} /></div>
                {/* <FontAwesomeIcon className="forward" size="2x" icon={faForward} /> */}
                <FontAwesomeIcon
                    className="step-forward"
                    icon={faStepForward}
                    onClick={() => skipTrackHandle("skipForward")}
                />
            </div>
            <div className="repeat-container">
                
                <div style={{position: 'relative'}}  onClick={volumeHandler}>
                    <Tooltip title="Volume">
                        <IconButton>
                        {volume === 0? <VolumeOffIcon style={{
                            backgroundColor: "red",
                            borderRadius: "4rem",
                            color: "white"
                        }} /> : <VolumeUpIcon style={{
                            backgroundColor: "green",
                            borderRadius: "4rem",
                            color: "white"
                            }} /> }
                    </IconButton>
                    </Tooltip>
                    
                   {volumeBar &&  <input onChange={changeVolumeHandler} value={volume*100} className="volume-bar" type="range" />}
                   
                </div>

                <div  onClick={playListHandler}>
                    <Tooltip title="Show Playlist">
                        <IconButton>
                        <QueueMusicIcon style={!libOpen ? {
                            backgroundColor: "black",
                            borderRadius: "4rem",
                            color: "white"
                        } : {}} />
                    </IconButton>
                    </Tooltip>
                </div>

                <div  onClick={randomSelectionHandler}>
                    <Tooltip title="Random Selection">
                        <IconButton>
                        <DeviceHubIcon style={randomSelection ? {
                            backgroundColor: "gold",
                            borderRadius: "4rem",
                            color: "white"
                        } : {}} />
                    </IconButton>
                    </Tooltip>
                </div>

                <div  onClick={repeatOneSongHandler}>
                    <Tooltip title="Repeat Song">
                        <IconButton>
                        <RepeatOneIcon style={repeatOneSong ? {
                            backgroundColor: "purple",
                            borderRadius: "4rem",
                            color: "white"
                        } : {}} />
                    </IconButton>
                    </Tooltip>
                </div>

                <div  onClick={repeatAllSongHandler}>
                    <Tooltip title="Play All">
                        <IconButton>
                        <RepeatIcon style={repeatAllSong ? {
                            backgroundColor: "teal",
                            borderRadius: "4rem",
                            color: "white"
                        } : {}} />
                    </IconButton>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};

export default Player;
