import React from 'react';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

const Nav = (props) => {

    const { libOpen, setLibOpen } = props;
    return (
        <nav>
            <h1> Waves </h1>
            <div onClick={() => (setLibOpen(!libOpen))} className="library-nav-btn">
                <Tooltip title="Show Playlist">
                    <IconButton>
                        <QueueMusicIcon style={{
                            borderRadius: "4rem",
                            fontSize: "30px"
                        }} />
                    </IconButton>
                    </Tooltip>
            </div>
        </nav>
    )
}

export default Nav
