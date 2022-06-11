import { CircularProgress } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Question } from "../../model";
import { Api } from "../../utils";
import { GameOptions } from "../Settings"

export interface GameProps {
  options: GameOptions;
}

export const Game: React.FC<GameProps> = ({ options }) => {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('loading');
  const [questions, setQuestions] = useState<Question[]>();

  const initGame = useCallback(async () => {
    const api = new Api();
    const response = await api.getQuestions(options);

    if (response.response_code !== 0) {
      setState('error');
      return;
    }

    setState('idle');
    setQuestions(response.results);
  }, [options]);

  useEffect(() => {
    initGame();
  }, [initGame, options]);

  return (
    <>
      {state === 'loading' && <CircularProgress />}
      {state === 'error' && <h1 style={{ textAlign: 'center' }}>Oops! Something went wrong. 🤷‍♂️</h1>}
      {state === 'idle' && !!questions?.length && questions.map((question, i) => (
        <div key={i}>{question.question}</div>
      ))}
    </>
  )
}
