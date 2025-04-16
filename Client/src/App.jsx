import { useState } from 'react';
import SponsorForm from './components/SponsorForm';
import InfluencerForm from './components/InfluencerForm';
import './App.css';

function App() {
  const [role, setRole] = useState('sponsor');

  return (
    <div className="App">
      <div className="toggle-buttons">
        <button
          className={role === 'sponsor' ? 'active' : ''}
          onClick={() => setRole('sponsor')}
        >
          Sponsor
        </button>
        <button
          className={role === 'influencer' ? 'active' : ''}
          onClick={() => setRole('influencer')}
        >
          Influencer
        </button>
      </div>

      {role === 'sponsor' ? <SponsorForm /> : <InfluencerForm />}
    </div>
  );
}

export default App;
