"use client";
import { useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";

// Define character sets to be used for generating passwords
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()_-+={}[]|\\:;\"',.<>?/".split("");

/* State variables  */
export default function Home() {
  const [length, setLength] = useState(14);
  const [includeUpperC, setIncludeUpperC] = useState(false);
  const [includeLowerC, setIncludeLowerC] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [strength, setStrength] = useState("");

  // Define a function to handle changes in the password length input
  function handleLengthChange(event) {
    setLength(parseInt(event.target.value));
  }

  // Define functions to handle changes in the state variables for character sets
  function includeUpperCChange(event) {
    setIncludeUpperC(event.target.checked);
  }

  function includeLowerCChange(event) {
    setIncludeLowerC(event.target.checked);
  }

  function includeNumbersChange(event) {
    setIncludeNumbers(event.target.checked);
  }

  function includeSymbolsChange(event) {
    setIncludeSymbols(event.target.checked);
  }

  // Define a function to generate a password based on the chosen character sets and length
  function generatePassword() {
    if (
      !includeUpperC &&
      !includeLowerC &&
      !includeNumbers &&
      !includeSymbols
    ) {
      setGeneratedPassword("No option included!");
    } else {
      const chosen = [];
      const general = [];

      if (includeUpperC) {
        addRandomCharacter(uppercase, chosen, general);
      }

      if (includeLowerC) {
        addRandomCharacter(lowercase, chosen, general);
      }

      if (includeNumbers) {
        addRandomCharacter(numbers, chosen, general);
      }

      if (includeSymbols) {
        addRandomCharacter(symbols, chosen, general);
      }

      const itemsNeeded = length - chosen.length;

      addRandomCharacters(general, chosen, itemsNeeded);

      shuffleArray(chosen);

      setGeneratedPassword(chosen.join(""));
      passwordStrength(chosen);
    }
  }

  /* Add a random character from the given characters to the chosen and general arrays  */
  function addRandomCharacter(characters, chosen, general) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    chosen.push(characters[randomIndex]);
    general.push(...characters);
  }

  /* Add random characters from the general array to the chosen array until the desired length is reached  */
  function addRandomCharacters(general, chosen, itemsNeeded) {
    for (let i = 0; i < itemsNeeded; i++) {
      const randomIndex = Math.floor(Math.random() * general.length);
      chosen.push(general[randomIndex]);
    }
  }

  /* Shuffle the elements of the chosen array using the Fisher-Yates shuffle algorithm  */
  function shuffleArray(chosen) {
    for (let i = chosen.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chosen[i], chosen[j]] = [chosen[j], chosen[i]];
    }
  }

  // Define an async function to copy the generated password to the clipboard
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  }

  /* Calculate the password strength based on various factors */
  function passwordStrength(chosen) {
    const lengthStrength = calculateLengthStrength();
    const upperStrength = calculateUpperStrength(chosen);
    const lowerStrength = calculateLowerStrength(chosen);
    const numberStrength = calculateNumberStrength(chosen);
    const symbolsStrength = calculateSymbolsStrength(chosen);
    const repeatStrength = calculateRepeatStrength(chosen);
    const mixStrength = calculateMixStrength(chosen);

    const totalStrength =
      lengthStrength +
      upperStrength +
      lowerStrength +
      numberStrength +
      symbolsStrength +
      repeatStrength +
      mixStrength;

    strengthResult(totalStrength);

    console.log(
      lengthStrength,
      upperStrength,
      lowerStrength,
      numberStrength,
      symbolsStrength,
      repeatStrength,
      mixStrength,
      totalStrength,
      strengthResult(totalStrength),
      strength
    );
  }

  /* Calculate the strength contributed by the length of the password */
  function calculateLengthStrength() {
    return length * 0.5;
  }

  /* Calculate the strength contributed by the presence of uppercase characters in the password */
  function calculateUpperStrength(chosen) {
    return chosen.some((char) => uppercase.includes(char)) ? 2 : 0;
  }

  /* Calculate the strength contributed by the presence of lowercase characters in the password */
  function calculateLowerStrength(chosen) {
    return chosen.some((char) => lowercase.includes(char)) ? 2 : 0;
  }

  /* Calculate the strength contributed by the presence of numeric characters in the password */
  function calculateNumberStrength(chosen) {
    return chosen.some((char) => numbers.includes(char)) ? 2 : 0;
  }

  /* Calculate the strength contributed by the presence of symbol characters in the password */
  function calculateSymbolsStrength(chosen) {
    return chosen.some((char) => symbols.includes(char)) ? 2 : 0;
  }

  /* Calculate the strength contributed by the absence of repeated characters in the password */
  function calculateRepeatStrength(chosen) {
    return chosen.length === new Set(chosen).size ? 3 : 0;
  }

  /* Calculate the strength contributed by a well-mixed selection of character categories in the password */
  function calculateMixStrength(chosen) {
    const freq = Math.floor(chosen.length / 4);
    return checkCategories(chosen, freq) ? 4 : 0;
  }

/* Determine the strength label based on the total password strength score */
  function strengthResult(totalStrength) {
    if (totalStrength >= 6 && totalStrength <= 10) {
      setStrength(1);
      return "Very Weak";
    } else if (totalStrength > 10 && totalStrength <= 15) {
      setStrength(2);
      return "Weak";
    } else if (totalStrength > 15 && totalStrength <= 20) {
      setStrength(3);
      return "Strong";
    } else if (totalStrength > 20 && totalStrength <= 25) {
      setStrength(4);
      return "Very Strong";
    }
  }

/* Check if the chosen characters cover all character categories with the required frequency */
  function checkCategories(chosen, freq) {
    const chosenSet = new Set(chosen);

    const hasUppercase = uppercase.some((char) => chosenSet.has(char));
    const hasLowercase = lowercase.some((char) => chosenSet.has(char));
    const hasNumbers = numbers.some((char) => chosenSet.has(char));
    const hasSymbols = symbols.some((char) => chosenSet.has(char));

    const uppercaseCount = chosen.filter((char) =>
      uppercase.includes(char)
    ).length;
    const lowercaseCount = chosen.filter((char) =>
      lowercase.includes(char)
    ).length;
    const numbersCount = chosen.filter((char) => numbers.includes(char)).length;
    const symbolsCount = chosen.filter((char) => symbols.includes(char)).length;

    return (
      hasUppercase &&
      uppercaseCount === freq &&
      hasLowercase &&
      lowercaseCount === freq &&
      hasNumbers &&
      numbersCount === freq &&
      hasSymbols &&
      symbolsCount === freq
    );
  }

  /* !!!!!!!!!!!!!!!! return starts here !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  */
  return (
    <main>
      <Header
        generatedPassword={generatedPassword}
        copyToClipboard={copyToClipboard}
      />
      <Section
        includeUpperC={includeUpperC}
        includeLowerC={includeLowerC}
        includeNumbers={includeNumbers}
        includeSymbols={includeSymbols}
        includeUpperCChange={includeUpperCChange}
        includeLowerCChange={includeLowerCChange}
        includeNumbersChange={includeNumbersChange}
        includeSymbolsChange={includeSymbolsChange}
        length={length}
        handleLengthChange={handleLengthChange}
        generatePassword={generatePassword}
        strength={strength}
      />
      <Footer />
    </main>
  );
}
