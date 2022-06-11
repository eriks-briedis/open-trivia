import { useCallback, useEffect, useRef, useState } from "react";
import { Question } from "../../model";
import { Api } from "../../utils";
import { Error } from "../Error";
import { GameQuestion } from "../GameQuestion";
import { Loading } from "../Loading";
import { GameOptions } from "../Settings"

export interface GameProps {
  options: GameOptions;
  onBack: () => void;
}

export const Game: React.FC<GameProps> = ({ options, onBack }) => {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('loading');
  const [questions, setQuestions] = useState<Question[]>();
  const mounted = useRef('');

  const initGame = useCallback(async () => {
    const api = new Api();
    try {
      const response = await api.getQuestions(options);

      if (response.response_code !== 0) {
        setState('error');
        return;
      }

      setState('idle');
      setQuestions(response.results);
    } catch (e) {
      setState('error');
    }
  }, [options]);

  useEffect(() => {
    const stringOptions = JSON.stringify(options);
    if (mounted.current === stringOptions) {
      return;
    }

    initGame();
    mounted.current = stringOptions;
  }, [initGame, options]);

  return (
    <>
      {state === 'loading' && <Loading />}
      {state === 'error' && <Error onBack={onBack} />}
      {state === 'idle' && !!questions?.length && questions.map((question, i) => (
        <GameQuestion key={i} question={question} />
      ))}
    </>
  )
}
