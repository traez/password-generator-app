/* This function returns a React component that represents the section of the page.  */
export default function Section({
  includeUpperC,
  includeLowerC,
  includeNumbers,
  includeSymbols,
  includeUpperCChange,
  includeLowerCChange,
  includeNumbersChange,
  includeSymbolsChange,
  length,
  handleLengthChange,
  generatePassword,
  strength,
}) {
  let strengthText;

  /* Determine the strength text based on the strength value  */
  if (strength === 1) {
    strengthText = "VERY WEAK!";
  } else if (strength === 2) {
    strengthText = "WEAK";
  } else if (strength === 3) {
    strengthText = "STRONG";
  } else if (strength === 4) {
    strengthText = "VERY STRONG!";
  }

  const spanStyles = {
    backgroundColor: "var(--lemon-green)",
  };

  /* Create an array of span elements to represent the strength indicators  */
  const spans = Array.from({ length: 4 }, (_, index) => (
    <span key={index} style={index < strength ? spanStyles : null}></span>
  ));

  return (
    <section>
      <menu>
        <div id="menu-len">Character Length</div>
        <div id="menu-num">{length}</div>
      </menu>
      <input
        type="range"
        min="8"
        max="20"
        id="slider"
        value={length}
        onChange={handleLengthChange}
      />
      <ul>
        <li>
          <input
            id="uppercase"
            type="checkbox"
            checked={includeUpperC}
            onChange={includeUpperCChange}
          />
          <label>Include Uppercase Letters</label>
        </li>
        <li>
          <input
            id="lowercase"
            type="checkbox"
            checked={includeLowerC}
            onChange={includeLowerCChange}
          />
          <label>Include Lowercase Letters</label>
        </li>
        <li>
          <input
            id="numbers"
            type="checkbox"
            checked={includeNumbers}
            onChange={includeNumbersChange}
          />
          <label>Include Numbers</label>
        </li>
        <li>
          <input
            id="symbols"
            type="checkbox"
            checked={includeSymbols}
            onChange={includeSymbolsChange}
          />
          <label>Include Symbols</label>
        </li>
      </ul>
      <article>
        <nav id="art-navstr">STRENGTH:</nav>
        <nav id="art-nav">
          <div id="art-navdiv-too">{strengthText}</div>
          <div id="art-navdiv-span">{spans}</div>
        </nav>
      </article>
      <aside onClick={generatePassword}>
        <div id="aside-gen">GENERATE</div>
        <div id="aside-icon">
          <img src="./images/arrow.png" id="icon-arrow" alt="" />
        </div>
      </aside>
    </section>
  );
}
