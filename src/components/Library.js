import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import React, { useState } from "react";
import LibrarySong from "./LibrarySong";
import SearchIcon from "@material-ui/icons/Search";
import { Divider } from "@material-ui/core";

const Library = (props) => {
  const {
    songs,
    setCurrentSong,
    setSongs,
    play,
    setPlay,
    audioRef,
    libOpen,
    currentSong,
  } = props;
  const [searchPlaylist, setSearchPlaylist] = useState("");

  const playlistSearchHandler = (e) => {
    setSearchPlaylist(e.target.value);
  };

  return (
    <div className={`library ${libOpen ? "" : "active-libary"}`}>
      <div className="library-search">
        <FormControl variant="outlined">
          <InputLabel> Search Playlist</InputLabel>
          <OutlinedInput
            endAdornment={
              <SearchIcon
                onChange={playlistSearchHandler}
                style={{ cursor: "pointer" }}
              />
            }
            variant="outlined"
            onChange={playlistSearchHandler}
            label="Search Playlist"
          />
        </FormControl>
      </div>
      <div className="library-songs">
        {songs.map((song) =>
          song.name.toLowerCase().includes(searchPlaylist) ? (
            <div>
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
              <Divider />
            </div>
          ) : (
            song.artist.toLowerCase().includes(searchPlaylist) && (
              <div>
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
                <Divider />
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Library;
