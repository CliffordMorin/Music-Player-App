import React, { useState, useRef } from 'react';
//Adding Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
//Import Styles
import './styles/app.scss';
//Import Util
import data from './util';

function App() {
	//Ref
	const audioRef = useRef(null);
	//State
	const [ songs, setSongs ] = useState(data());
	const [ currentSong, setCurrentSong ] = useState(songs[6]);
	const [ isPlaying, setIsPlaying ] = useState(false);
	const [ songInfo, setSongInfo ] = useState({
		currentTime: 0,
		duration: 0
	});
	const timeUpdateHandler = (e) => {
		const current = e.target.currentTime;
		const duration = e.target.duration;
		setSongInfo({ ...songInfo, currentTime: current, duration: duration });
	};
	return (
		<div className="App">
			<Song currentSong={currentSong} />
			<Player
				setSongInfo={setSongInfo}
				songInfo={songInfo}
				audioRef={audioRef}
				setIsPlaying={setIsPlaying}
				isPlaying={isPlaying}
				currentSong={currentSong}
			/>
			<Library isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
			<audio
				onTimeUpdate={timeUpdateHandler}
				onLoadedMetadata={timeUpdateHandler}
				ref={audioRef}
				src={currentSong.audio}
			/>
		</div>
	);
}

export default App;
