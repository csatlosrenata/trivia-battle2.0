function LeaderboardPage() {
  const scores = JSON.parse(localStorage.getItem('scores')) || [];

  return (
    <div className="centered">
      <h2>Top játékosok</h2>
      <ul>
        {scores.map((s, i) => (
          <li key={i}>{s.name} – {s.score} pont</li>
        ))}
      </ul>
    </div>
  );
}

export default LeaderboardPage;
