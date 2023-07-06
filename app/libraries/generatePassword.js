export default function generatePassword() {
  // Initialize two arrays to hold the chosen characters and all possible characters
  const chosen = [];
  const general = [];

  if (!includeUpperC && !includeLowerC && !includeNumbers && !includeSymbols) {
    setGeneratedPassword("No option included!");
  } else {
    // Add characters to the chosen and general arrays based on which character sets are selected
    if (includeUpperC) {
      const randomIndex = Math.floor(Math.random() * uppercase.length);
      chosen.push(uppercase[randomIndex]);
      general.push(...uppercase);
    }

    if (includeLowerC) {
      const randomIndex = Math.floor(Math.random() * lowercase.length);
      chosen.push(lowercase[randomIndex]);
      general.push(...lowercase);
    }

    if (includeNumbers) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      chosen.push(numbers[randomIndex]);
      general.push(...numbers);
    }

    if (includeSymbols) {
      const randomIndex = Math.floor(Math.random() * symbols.length);
      chosen.push(symbols[randomIndex]);
      general.push(...symbols);
    }

    /* Calculate the number of characters still needed based on the chosen length and number of chosen characters  */
    const itemsNeeded = length - chosen.length;

    /* Add random characters from the general array to the chosen array until the desired length is reached  */
    for (let i = 0; i < itemsNeeded; i++) {
      const randomIndex = Math.floor(Math.random() * general.length);
      chosen.push(general[randomIndex]);
    }

    // Shuffle the chosen array using the Fisher-Yates shuffle algorithm
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }

    // Join the shuffled array into a string and set it as the generated password
    setGeneratedPassword(chosen.join(""));

    console.log(chosen, general);
  }
}
