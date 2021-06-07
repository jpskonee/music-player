import { TextField } from '@material-ui/core';
import React, { useState } from 'react';
import LibrarySong from './LibrarySong';

const Library = (props) => {
    
    const { songs, setCurrentSong, setSongs, play, setPlay, audioRef, libOpen, currentSong } = props;
    const [searchPlaylist, setSearchPlaylist] = useState("")

    const playlistSearchHandler = (e) => {
        setSearchPlaylist(e.target.value)
    };
    
    return (
        <div className={`library ${libOpen ? "" : "active-libary"}`}>
            <div className="library-search">
                <TextField variant="outlined" onChange={playlistSearchHandler}  label="Search Playlist" />
            </div>
            <div className="library-songs">
                {songs.map((song) => (

                    song.name.toLowerCase().includes(searchPlaylist) ? 
                    <LibrarySong
                            song={song}
                            setCurrentSong={setCurrentSong}
                            songs={songs}
                            id={song.id}
                            key={song.id}
                            setPlay={setPlay}
                            play={play}
                            audioRef={audioRef}
                            setSongs={setSongs}
                            currentSong={currentSong}
                        /> : song.artist.toLowerCase().includes(searchPlaylist) && 
                            <LibrarySong
                            song={song}
                            setCurrentSong={setCurrentSong}
                            songs={songs}
                            id={song.id}
                            key={song.id}
                            setPlay={setPlay}
                            play={play}
                            audioRef={audioRef}
                            setSongs={setSongs}
                            currentSong={currentSong}
                        />
                ) 
               )}
                
            </div>
        </div>
    )
}

export default Library
