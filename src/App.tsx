import React, {useState} from 'react';
import {Difficulty, fetchQuizQuestions} from './api';
import QuestionCard from './components/QuestionCard';

interface GAME {
  loading: boolean,
  questions: string[],
  number: number,
  userAnswers: string[],
  score: number,
  gameOver: boolean
};

const TOTAL_QUESTIONS = 10;

export default function App() {

  const [gameTrivia, setGame] = useState<GAME>({
    loading: false,
    questions: [],
    number: 0,
    userAnswers: [],
    score: 0,
    gameOver: true 
  })

  console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
  async function startTrivia() {

  }

  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {

  }

  function nextQuestions() {

  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      <p className="score">Score:</p>
      <p>Loading Questions ...</p>
      {/* <QuestionCard
        questionNr={gameTrivia.number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={gameTrivia.questions}
        answers={gameTrivia.answers}
        userAnswer={userAnswers ? userAnwers[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestions}>
        Next Question
      </button>
    </div>
  );
}
