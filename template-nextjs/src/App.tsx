import { useRef } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import AuthButton from './components/AuthButton';
import { usePrivy } from '@privy-io/react-auth';

function App()
{
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const { ready, authenticated } = usePrivy();

    return (
        <div id="app">
            <AuthButton />
            {ready && authenticated && (
                <PhaserGame ref={phaserRef} />
            )}
            {ready && !authenticated && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    flexDirection: 'column',
                    gap: '1rem',
                    textAlign: 'center'
                }}>
                    <h2>🎮 World Games</h2>
                    <p>Please authenticate to start playing!</p>
                </div>
            )}
        </div>
    )
}

export default App 