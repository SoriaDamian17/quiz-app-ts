import React, { useState} from 'react';
import {Difficulty, fetchQuizQuestions, QuestionState} from './api';
import { GlobalStyle, Wrapper } from './App.styles';
import CountDown from './components/CountDown';
import QuestionCard from './components/QuestionCard';

export type AnswersObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string
}
interface GAME {
  loading: boolean,
  questions: QuestionState[],
  number: number,
  userAnswers: AnswersObject[],
  score: number,
  timer: number,
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
    timer: 10,
    gameOver: true 
  })

  async function startTrivia() {
    setGame({
      ...gameTrivia,
      loading: true,
      gameOver: false
    });
    const newQ = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setGame({
      ...gameTrivia,
      loading: false,
      score: 0,
      userAnswers: [],
      number: 0,
      questions: newQ,
      gameOver: false
    });
  }

  function checkAnswer(e: React.MouseEvent<HTMLButtonElement>) {
    const {score, gameOver, number, questions, userAnswers} = gameTrivia;
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) {
        let newScore = score + 1;
        setGame({
          ...gameTrivia,
          score: newScore
        });
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setGame({
        ...gameTrivia,
        userAnswers: [...userAnswers, answerObject]
      })
    }
  }

  function nextQuestions() {
    const {number} = gameTrivia;
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGame({
        ...gameTrivia,
        gameOver: true,
        timer: 0,
      });
    } else {
      setGame({
        ...gameTrivia,
        number: nextQuestion,
        timer: 10
      })
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameTrivia.gameOver || gameTrivia.userAnswers.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={startTrivia}>
            Start
          </button>
        ): null}
        {!gameTrivia.gameOver
        && gameTrivia.userAnswers.length === TOTAL_QUESTIONS
        && <p className="score">Score: {gameTrivia.score}</p>
        }
        {!gameTrivia.gameOver
        && !gameTrivia.loading
        && gameTrivia.userAnswers.length !== gameTrivia.number + 1
        && gameTrivia.number !== TOTAL_QUESTIONS - 1
        && <CountDown timer={gameTrivia.timer} onFinish={nextQuestions} />
        }
        {!gameTrivia.loading
        && !gameTrivia.gameOver
        && gameTrivia.userAnswers.length === gameTrivia.number + 1
        && gameTrivia.number !== TOTAL_QUESTIONS - 1
        && (
          <button className="next" onClick={nextQuestions}>
            Next Question
          </button>
        )}
        {gameTrivia.loading && <p>Loading Questions ...</p>}
        {!gameTrivia.loading && !gameTrivia.gameOver
        && (<QuestionCard
          questionNr={gameTrivia.number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={gameTrivia.questions[gameTrivia.number].question}
          answers={gameTrivia.questions[gameTrivia.number].answer}
          userAnswer={gameTrivia.userAnswers ? gameTrivia.userAnswers[gameTrivia.number] : undefined}
          callback={checkAnswer}
        />)}
      </Wrapper>
    </>
  );
}
