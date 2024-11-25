import React from "react";
import { useFilms } from "@context/FilmContext";
import FilmAccepted from "@components/FilmAccepted/FilmAccepted";
import FilmCard from "@components/FilmCard/FilmCard";
import AnimatedButton from "@components/AnimatedButton/AnimatedButton";
import styles from "./FilmView.module.css";

const FilmView: React.FC = () => {
    const { currentFilm, loading, error, acceptedFilm, handleAccept, handleReject, handleReset, noMoreMovies } = useFilms();

    if (loading) {
        return <p>Loading movies...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (acceptedFilm) {
        return (
            <div>
                <FilmAccepted film={acceptedFilm} />
                <div className={styles.centeredText}>
                    <AnimatedButton onClick={handleReset}>Reset</AnimatedButton>
                </div>
            </div>
        );
    }

    if (noMoreMovies) {
        return (
            <div className={styles.noMoreMoviesContainer}>
                <h2>No more movies to display! 😞</h2>
                <AnimatedButton onClick={handleReset}>Reset</AnimatedButton>
            </div>
        );
    }

    return (
        <div>
            {!currentFilm ? (
                <p>No movies found.</p>
            ) : (
                <div className={styles.mainContainer}>
                    <FilmCard key={currentFilm.id} film={currentFilm} />
                    <div className={styles.buttonsContainer}>
                        <AnimatedButton onClick={() => handleAccept(currentFilm.id)}>
                            Accept 👍
                        </AnimatedButton>
                        <AnimatedButton onClick={() => handleReject(currentFilm.id)}>
                            Reject 👎
                        </AnimatedButton>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmView;
