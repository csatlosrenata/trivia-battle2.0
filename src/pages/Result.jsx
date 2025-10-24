import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const saveScore = () => {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, score: state.score });
    const sorted = scores.sort((a, b) => b.score - a.score).slice(0, 5);
    localStorage.setItem('scores', JSON.stringify(sorted));
    navigate('/leaderboard');
  };

  return (
    <div className="centered">
      <h2>Eredmény: {state.score} / {state.total}</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Neved" />
      <button onClick={saveScore}>Mentés</button>
      <button onClick={() => navigate('/')}>Új játék</button>
    </div>
  );
}

export default Result;
