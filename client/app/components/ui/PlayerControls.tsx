"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FaShuffle, FaCirclePlay,FaCirclePause, FaRepeat, FaVolumeHigh } from "react-icons/fa6";
import { FaBackward, FaForward } from "react-icons/fa";

interface Song {
    title: string;
    artists: string;
    album: string;
    releaseDate: string;
    duration: string;
    cover: string;
    audioUrl: string;
}

interface PlayerControlsProps {
    currentSong: Song | null;
}

export default function PlayerControls({ currentSong }: PlayerControlsProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);

    useEffect(() => {
        if (currentSong && audioRef.current) {
            audioRef.current.src = currentSong.audioUrl;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSong]);

    const togglePlayPause = () => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = Number(event.target.value);
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.volume = Number(event.target.value) / 100;
            setVolume(Number(event.target.value));
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault();
                togglePlayPause();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 
     
    return (
        <div className="flex flex-col w-[70vw]">
            <div className="flex">
                <div className="flex items-center justify-between text-primary mx-auto w-[55vw]">
                    <div>
                        {/* Additional controls can go here */}
                    </div>
                    <div className="flex justify-center items-center">
                        <FaShuffle size="24px" className="mr-4" />
                        <FaBackward size="24px" />
                        {/* <FaCirclePlay size="40px" className="mx-4" onClick={togglePlayPause} /> */}
                        {isPlaying ? (
                            <FaCirclePause size="40px" className="mx-4 transition-transform duration-200 ease-in-out hover:scale-110" onClick={togglePlayPause} />
                        ) : (
                            <FaCirclePlay size="40px" className="mx-4 transition-transform duration-200 ease-in-out hover:scale-110" onClick={togglePlayPause} />
                        )}
                        <FaForward size="24px" className="mr-4" />
                        <FaRepeat size="24px" />
                    </div>
                    <div className="flex text-primary items-center">
                        <FaVolumeHigh size="22px" className="mr-2"/> 
                        <input type="range" min="0" max="100" value={volume} onChange={handleVolumeChange} className="spotify-slider" />
                    </div>
                </div>
                
            </div>
            <div className="flex items-center w-[60vw] mx-auto mt-1">
                <span className="text-primary text-xs mr-2">{formatTime(currentTime)}</span>
                <input type="range" min="0" max={duration} value={currentTime} onChange={handleSeek} className="flex-1 mr-1 spotify-slider" />
                <span className="text-primary text-xs ml-2">{formatTime(duration)}</span>
            </div>
            <audio 
                ref={audioRef} 
                onTimeUpdate={handleTimeUpdate} 
                onLoadedMetadata={handleLoadedMetadata} 
                onEnded={() => setIsPlaying(false)} 
            />
        </div>
    );
}
