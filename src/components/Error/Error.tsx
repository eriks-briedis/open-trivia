import Button from "@mui/material/Button"

export interface ErrorProps {
  onBack: () => void;
}

export const Error: React.FC<ErrorProps> = ({ onBack }) => {
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Oops! Something went wrong. 🤷‍♂️</h1>
      <div style={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={onBack}>Back</Button>
      </div>
    </>
  )
}
