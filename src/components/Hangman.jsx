import React, { useState, useEffect } from "react";
import Dessin from "./Dessin"

import '../App.css';

function Hangman() {

    const [word, setWord] = useState("");
    const [revealedLetters, setRevealedLetters] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [disabledLetters, setDisabledLetters] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
  
    
    //On fetch les mots de l'API
    const fetchWord = () => {
      fetch("http://localhost:3001/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          locale: "fr-FR",
        }),
      })
        .then((res) => res.json())
        .then((word) => {
          setWord(word.word.toUpperCase());
          setRevealedLetters(Array(word.word.length).fill("_"));
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMessage("Impossible de récupérer les données");
        });
    };
    
    //Lettres pour le Keyboard
    const letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
  
    //On vérif si la lettre cliquée est dans le mot
    const handleLetterClick = (letter) => {
      const isLetterCorrect = word.includes(letter);
    
      setWrongGuesses(wrongGuesses + (isLetterCorrect ? 0 : 1));
      setDisabledLetters([...disabledLetters, letter]);
    
      const newRevealedLetters = word.split("").map((char, index) =>
        disabledLetters.includes(char) ? char : revealedLetters[index]
      );

      if (isLetterCorrect) {
        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            newRevealedLetters[i] = letter;
          }
        }
    }
      setRevealedLetters(newRevealedLetters);
    };
    
  
    //On redemarre le jeu
    const handleRestart = () => {
      setWrongGuesses(0);
      setDisabledLetters([]);
      setRevealedLetters(Array(word.length).fill("_"));
      fetchWord();
    }
  
    useEffect(() => {
      fetchWord();
    }, []);

    return (
        <div className="Hangman_txt">
            <div className="Hangman_div">
            <div className="word">
                <p>{revealedLetters.join(" ")}</p>
            </div>
            <div className="keyboard">
                {letters.map((letter) => (
                <button
                    key={letter}
                    disabled={disabledLetters.includes(letter) || revealedLetters.join("") === word || wrongGuesses >= 7}
                    className={disabledLetters.includes(letter) ? "disabled" : ""}
                    onClick={() => handleLetterClick(letter)}
                >
                    {letter}
                </button>
                ))}
            </div>
            
            <p>Erreurs restantes: {7 - wrongGuesses}</p>
            {wrongGuesses >= 7 && (
                <div className="gameover">
                <p>Perdu! Le mot était {word}.</p>
                <button onClick={handleRestart}>Recommencer</button>
                </div>
            )}
            {revealedLetters.join("") === word && (
                <div className="youwon">
                <p>Félicitations! Vous avez gagné!</p>
                <button onClick={handleRestart}>Recommencer</button>
                </div>
            )}
            </div>
            <div className="Hangman_draw">

            </div>
        </div>
      );
}

export default Hangman;