import { useState } from 'react';
import { Game, GameOptions, Settings, Start } from './components';

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
      {status === 'game' && !!options && <Game options={options} />}
    </>
  );
}

export default App;
