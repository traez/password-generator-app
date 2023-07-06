for (let i = chosen.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
}

shuffleArray(chosen);

function shuffleArray(chosen) {
  for (let i = chosen.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
  }
}