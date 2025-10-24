import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const startGame = (difficulty) => {
    navigate('/quiz', { state: { difficulty } });
  };

  return (
    <div className="centered">
      <h1>Trivia Battle</h1>
      <p>Válassz nehézségi szintet:</p>
      <button onClick={() => startGame('easy')}>Easy</button>
      <button onClick={() => startGame('medium')}>Medium</button>
      <button onClick={() => startGame('hard')}>Hard</button>
    </div>
  );
}

export default Home;
