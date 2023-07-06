# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![Result screenshot](./ScreenshotResult.PNG)

### Links

- Live Site URL: [https://lordyner.github.io/password-generator-app/]

## My process

Analysing :
I started by looking at the models on figma. I analyzed the different problematic. At first, I thought the main difficulty will be the generation of the password. I didn't know how to do it in js. But the design seemed easy to me.
Set-up environnement
 I started by creating my react apps, then all the sass variables with the fonts, colors, breakpoints and then I created all the different components.

 80% of the layout : 
 I added a bit of style to have the layout. One difficulty I didn't realize when I started was the custom components. I thought I could style a classic checkbox to look like the model. 
 Generating the password :
 Once I had the layout done at 80-90%, I started to work on the main functionnality : generating a password. I started by trying to do it myself, but I quickly realize that it would be a bit too much work and that a light library could do it easily, so I used the library. 
 
The end (most of the time spent ^^) : 
 Another difficulty was implementing the different strength result depending on the options checked. I ended up with a solution that's redundant but I didn't find another way to do it. Lastly but not least, the input range was a bit shit to implement for all the browsers. There were few particurality for chrome browsers that makes me want to uninstall it and pretend I've never used it. For mozilla and IE/Edge you have pseudo elements that you can use to set the progress background color of the track. But in chrome you have to calculate the progress yourself and set background on the track and do a linear-gradient... . Anyway to take a break from this problem I finished the layout to 100% and also handle for tablets and desktop.


### Built with

- Semantic HTML5 markup
- CSS custom elements
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

I learned how to make a custom checkbox and also how to style an input range cross browsers. 

### Continued development

I want to keep working on more javascript. My next challenge is probably going to be the "Connect Four Game".

### Useful resources

- [https://nikitahl.com/style-range-input-css] - This helped me to style my input range and understand how it works.
- [https://www.npmjs.com/package/generate-password-browser] - The library I used to generate passwords.

## Author

- Github - [Lordyner](https://github.com/Lordyner)
- Frontend Mentor - [@Lordyner](https://www.frontendmentor.io/profile/Lordyner)


## Acknowledgments

Thanks to @Still for helping me on my input range problem for chrome.