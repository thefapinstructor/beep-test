import { useEffect, useState } from 'react';
import './App.css';
import * as audio from './audio';

function App() {
  const [beeper, setBeeper] = useState(false);

  useEffect(() => {
    let interval: number;
    if (beeper) {
      interval = setInterval(() => {
        audio.beep();
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [beeper]);

  return (
    <>
      <p>Beeping: {beeper.toString()}</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => {
            setBeeper(true);
          }}
        >
          Start Beeper
        </button>
        <button
          onClick={() => {
            setBeeper(false);
          }}
        >
          Stop Beeper
        </button>
      </div>
    </>
  );
}

export default App;
