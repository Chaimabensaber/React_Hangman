import Hangman from "./components/Hangman"
import Nav from "./components/Nav"
import './App.css';

function App() {

  return (
    <div className="App">
      <Nav />
      <main>
      <h1>Jeu du Pendu</h1>
      <Hangman />
      </main>
    </div>
  );
}

export default App;