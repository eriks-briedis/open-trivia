import { useState } from 'react';
import { Start } from './components';

function App() {
  const [status, setStatus] = useState<'intro' | 'settings' | 'game'>('intro');

  return (
    <>
      {status === 'intro' && <Start onStart={() => setStatus('settings')} />}
      {status === 'settings' && <div>@TODO Game Settings</div>}
    </>
  );
}

export default App;
