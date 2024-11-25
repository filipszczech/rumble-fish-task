import React from "react";
import { Recommendation } from "../../types";
import { motion } from "motion/react";
import styles from "./FilmAccepted.module.css";

interface FilmCardProps {
  film: Recommendation;
}

const FilmAccepted: React.FC<FilmCardProps> = ({ film }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 200 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={styles.content}>
      <h2>Congratulations! ✨</h2>
      <img src={film.imageURL} alt={film.title} />
      <h2>Your match: {film.title}</h2>
    </motion.div>
  );
};

export default FilmAccepted;

