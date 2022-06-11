import { useState } from 'react';
import { GameOptions, Settings, Start } from './components';

function App() {
  const [status, setStatus] = useState<'intro' | 'settings' | 'game'>('intro');
  const [options, setOptions] = useState<GameOptions>();

  const handleGameStart = (options: GameOptions) => {
    setStatus('game');
    setOptions(options);
  };

  return (
    <>
      {status === 'intro' && <Start onStart={() => setStatus('settings')} />}
      {status === 'settings' && <Settings onStartGame={handleGameStart} />}
    </>
  );
}

export default App;
