"use client";
import { useState, useEffect } from "react";
import { BsMusicNoteBeamed, BsMusicNote } from "react-icons/bs";
import { GiMusicalNotes, GiMicrophone, GiSpeaker } from "react-icons/gi";
import { FaMusic } from "react-icons/fa";

const noteData = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  iconIndex: i % 6,
  size: 10 + (i % 10) + 10,
  top: (i * 7) % 100,
  left: (i * 13) % 100,
  opacity: 0.1 + ((i % 5) / 10),
  animation: `float-${i % 3}`,
  duration: 5 + (i % 10),
  delay: i % 5,
}));

export const MusicBackground = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const noteIcons = [
      <BsMusicNoteBeamed key="icon1" />,
      <BsMusicNote key="icon2" />,
      <GiMusicalNotes key="icon3" />,
      <FaMusic key="icon4" />,
      <GiMicrophone key="icon5" />,
      <GiSpeaker key="icon6" />
    ];

    const newNotes = noteData.map(note => ({
      ...note,
      icon: noteIcons[note.iconIndex]
    }));

    setNotes(newNotes);
  }, []);

  return (
    <div className="absolute bg-[#63B2AE] dark:bg-black inset-0 pointer-events-none overflow-hidden">
      {notes.map((note) => (
        <div
          key={note.id}
          className="absolute text-primary-light animate-float"
          style={{
            top: `${note.top}%`,
            left: `${note.left}%`,
            fontSize: `${note.size}px`,
            opacity: note.opacity,
            animation: `float ${note.duration}s ease-in-out ${note.delay}s infinite alternate`,
          }}
        >
          {note.icon}
        </div>
      ))}
    </div>
  );
};
