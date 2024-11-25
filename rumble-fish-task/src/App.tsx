import './App.css';
import FilmView from "@components/FilmView/FilmView";
import { FilmsProvider } from "@context/FilmContext";

function App() {
  return (
    <>
      <FilmsProvider>
        <div className="container">
          <h1 className="header">Tinder for movies 🎥</h1>
          <FilmView />
        </div>
      </FilmsProvider>
    </>
  )
}

export default App
