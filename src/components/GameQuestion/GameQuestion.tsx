import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { decode } from 'html-entities';
import { useCallback, useEffect, useState } from 'react';
import { shuffleArray } from '../../utils';
import { Question } from '../../model';

export interface GameQuestionProps {
  question: Question;
}

export const GameQuestion: React.FC<GameQuestionProps> = ({ question }) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [answered, setAnswered] = useState<string>('');

  useEffect(() => {
    setAnswers(shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers,
    ]));
  }, [question]);

  const handleAnswer = useCallback((answer: string) => {
    if (!!answered) {
      return;
    }
    setAnswered(answer);
  }, [answered]);

  const getButtonColor = useCallback((answer: string) => {
    if (!answered || answer !== answered) {
      return 'info';
    }

    return answer === question.correct_answer ? 'success' : 'error';
  }, [answered, question]);

  return (
    <div>
      <h2>{decode(question.question)}</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonGroup variant="contained">
          {answers.map((answer, i) => (
            <Button
              color={getButtonColor(answer)}
              key={i}
              onClick={() => handleAnswer(answer)}
              sx={{
                cursor: !answered ? 'pointer' : 'default',
              }}
            >
              {answer}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  )
}
