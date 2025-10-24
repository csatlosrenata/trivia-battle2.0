import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { shuffle } from '../utils/helpers';

function Quiz() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const difficulty = state?.difficulty || 'easy';

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

  // Kérdések lekérése
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=18&type=multiple&difficulty=${difficulty}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          const formatted = data.results.map(q => ({
            question: q.question,
            correct: q.correct_answer,
            options: shuffle([...q.incorrect_answers, q.correct_answer])
          }));
          setQuestions(formatted);
        }
      })
      .catch(err => console.error("API hiba:", err));
  }, [difficulty]);

  // Időzítő
  useEffect(() => {
    if (timeLeft === 0) handleAnswer(null);
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Válasz kezelése
  const handleAnswer = (option) => {
    setSelected(option);
    const currentQuestion = questions[current];
    if (currentQuestion && option === currentQuestion.correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
        setSelected(null);
        setTimeLeft(10);
      } else {
        navigate('/result', { state: { score, total: questions.length } });
      }
    }, 1000);
  };

  // Ha még nincs kérdés vagy index túlmegy
  if (!questions.length || !questions[current]) return <p>Betöltés...</p>;

  const q = questions[current];

  return (
    <div className="centered">
      <h2 dangerouslySetInnerHTML={{ __html: q.question }} />
      <div className="progress" style={{ width: `${timeLeft * 10}%` }}></div>
      {q.options.map((opt, i) => (
        <button
          key={i}
          className={
            selected
              ? opt === q.correct
                ? 'correct'
                : opt === selected
                ? 'incorrect'
                : ''
              : ''
          }
          onClick={() => handleAnswer(opt)}
          dangerouslySetInnerHTML={{ __html: opt }}
        />
      ))}
    </div>
  );
}

export default Quiz;
