import React from 'react'

const Song = ({ currentSong, beatGif }) => {
    return (
            <div className="song-container">
            {!beatGif ? <img src={currentSong.cover} alt="Song cover pics" />
                : <img src="https://i.gifer.com/Z23N.gif" alt="Song cover pics" />}
                <h2> {currentSong.name} </h2>
                <h3> {currentSong.artist} </h3>
            </div>
    )
}

export default Song
