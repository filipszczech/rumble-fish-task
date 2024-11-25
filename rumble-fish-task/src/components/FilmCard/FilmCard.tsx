import React, { useState } from "react";
import { Recommendation } from "../../types";
import styles from './FilmCard.module.css'; 
import { motion, useMotionValue, useTransform  } from "motion/react";
import { useFilms } from "@context/FilmContext";

interface FilmCardProps {
  film: Recommendation;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
  const [dragging, setDragging] = useState(false);
  const x = useMotionValue(0);

  const opacity = useTransform(x, [-200, 0, 200], [0, 1, 1]);
  const scale = useTransform(x, [-200, 0, 200], [0.8, 1, 0.9]);
  const { handleAccept, handleReject } = useFilms();
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number } }) => {
    setDragging(false);
    if (info.offset.x < -200) {
      handleReject(film.id);
    }
    if (info.offset.x > 200) {
      handleAccept(film.id);
    }
  };

  return (
    <motion.div style={{ x, opacity, scale }} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100 }} whileHover={{ y: -3 }} drag="x" dragSnapToOrigin={true} onDragStart={() => setDragging(true)} onDragEnd={handleDragEnd}>
      <div className={styles.card}>
        <img
          src={film.imageURL}
          alt={film.title}
          draggable="false"
        />
        <h2>{film.title.toUpperCase()} ({film.rating})</h2>
        <p>{film.summary}</p>
      </div>
    </motion.div>
  );
};

export default FilmCard;
