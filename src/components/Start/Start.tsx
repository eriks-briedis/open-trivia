import Button from "@mui/material/Button";

export interface StartProps {
  onStart: () => void;
}

export const Start: React.FC<StartProps> = ({ onStart }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Open Trivia</h1>
      <p>
        Let's play some fun trivia!
      </p>
      <Button variant="contained" onClick={onStart}>Start</Button>
    </div>
  );
}
