import React, { createContext, useContext, useEffect, useState } from "react";
import { Recommendation } from "../types";
import { fetchRecommendations } from "../api/getFilmData";

interface FilmContextValue {
    movies: Recommendation[];
    loading: boolean;
    error: string | null;
    currentFilm: Recommendation | null;
    acceptedFilm: Recommendation | null;
    noMoreMovies: boolean;
    loadNextFilm: () => void;
    handleAccept: (id: string) => void;
    handleReject: (id: string) => void;
    handleReset: () => void;
}

const FilmContext = createContext<FilmContextValue | undefined>(undefined);

export const FilmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentFilmIndex, setCurrentFilmIndex] = useState<number>(0);
    const [acceptedFilm, setAcceptedFilm] = useState<Recommendation | null>(null);
    const [noMoreMovies, setNoMoreMovies] = useState<boolean>(false);

    const loadMovies = async () => {
        setLoading(true);
        try {
            const data = await fetchRecommendations();
            setMovies(data);
            setCurrentFilmIndex(0);
            setAcceptedFilm(null);
            setNoMoreMovies(false);
        } catch (err) {
            setError("Failed to load movies");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const loadNextFilm = () => {
        if (currentFilmIndex < movies.length - 1) {
            setCurrentFilmIndex((prevIndex) => prevIndex + 1);
        } else {
            setNoMoreMovies(true);
        }
    };

    const handleAccept = async (id: string) => {
        try {
            console.log(`Sending PUT to /recommendations/${id}/accept`);
            const accepted = movies[currentFilmIndex]; 
            setAcceptedFilm(accepted);
        } catch (err) {
            console.error("Error accepting film:", err);
        }
    };

    const handleReject = async (id: string) => {
        try {
            console.log(`Sending PUT to /recommendations/${id}/reject`);
            loadNextFilm();
        } catch (err) {
            console.error("Error rejecting film:", err);
        }
    };

    const handleReset = () => {
        loadMovies();
    };

    const currentFilm = movies[currentFilmIndex] || null;

    return (
        <FilmContext.Provider value={{ movies, loading, error, currentFilm, loadNextFilm, handleAccept, handleReject, handleReset, noMoreMovies, acceptedFilm }}>
            {children}
        </FilmContext.Provider>
    );
};

export const useFilms = (): FilmContextValue => {
    const context = useContext(FilmContext);
    if (!context) {
        throw new Error("useFilms must be used within a FilmsProvider");
    }
    return context;
};
