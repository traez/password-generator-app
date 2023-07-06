"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Footer from "./components/Footer";
import generatePassword from "./libraries/generatePassword";

// Define character sets to be used for generating passwords
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");
const numbers = "0123456789".split("");
const symbols = "~`!@#$%^&*()_-+={}[]|\\:;\"',.<>?/".split("");

export default function Home() {
  const [length, setLength] = useState(14);
  const [includeUpperC, setIncludeUpperC] = useState(false);
  const [includeLowerC, setIncludeLowerC] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

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
    // Initialize two arrays to hold the chosen characters and all possible characters
    const chosen = [];
    const general = [];

    if (
      !includeUpperC &&
      !includeLowerC &&
      !includeNumbers &&
      !includeSymbols
    ) {
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

  // Define an async function to copy the generated password to the clipboard
  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  }

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
      />
      <Footer />
    </main>
  );
}
