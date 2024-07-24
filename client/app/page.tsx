"use client";
import React, { useState } from 'react';
import Sidebar from "./components/main/Sidebar";
import Main from "./components/main/Main"; 
import Footer from "./components/main/Footer";

interface Song {
  title: string;
  artists: string;
  album: string;
  releaseDate: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

export default function Home() {

  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <Main onSongSelect={handleSongSelect} />
      </div>
      <Footer currentSong={currentSong} />
    </>
  );
}
