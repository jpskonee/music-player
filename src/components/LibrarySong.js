import React from 'react'
import { playAuido } from "../components/playAuido";

const LibrarySong = ({play, setSongs, currentSong ,setPlay, song, songs, setCurrentSong, id, audioRef }) => {
    
    const songSelectHandler = async () => {
        const selectedSong = await songs.filter((state) => state.id === id);
        setCurrentSong(selectedSong[0]);
        //add active state
        //check if its playing
        playAuido(play, audioRef);
        setPlay(true)
    };


    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active && `selected`}`}>
            <img src={song.cover} alt="Song cover pics"  />
            <div className="song-description">
                <h3> {song.name} </h3>
                <h4> {song.artist} </h4>
            </div>
        </div>
    )
}

export default LibrarySong
