const substitutionModule = (function () {

  function checkForDuplicates(inputtedAlphabet) { //Helper function to check for duplicates in a provided alphabet
    let duplicateFound = false;
    inputtedAlphabet.forEach((alphabetLetter, index) => {
      //console.log(`Currently checking ${alphabetLetter} for duplicates...`)
      inputtedAlphabet.forEach((subLetter, subIndex) => {
        //console.log(`...Comparing ${alphabetLetter} to ${subLetter}...`)
        if (alphabetLetter === subLetter && index !== subIndex) {
          //console.log("Duplicate found!")
          duplicateFound = true;
        }
      });
    });
    return duplicateFound;
  };

  function substitution(input, alphabet, encode = true) {
    if (!alphabet || alphabet.length !== 26) return false; //Check if alphabet is missing or alphabet length is not 26
    //console.log(`Initial array derived from provided alphabet: ${alphabetArray}`);
    const alphabetArray = Array.from(alphabet); //Convert alphabet into a workable array
    if (checkForDuplicates(alphabetArray)) return false;; //Check for duplicates
    const inputArray = Array.from(input); //Create iteratable/workable array from input
    let subbedArray = []; //Create collector array for substituted characters
  
    if (encode) { //Encoding==============================================================================================
      //console.log("====ENCODING====");
      //Create a legend for encoding from the provided alphabet; e.g., { a : subLetter }==================================
      let orderedLetterCode = 97;
      const encodingLegend = alphabetArray.reduce((legend, char) => { 
        const orderedLetter = String.fromCharCode(orderedLetterCode);
        legend[orderedLetter] = char;
        orderedLetterCode += 1;
        //console.log(`Transcribing legend... legend updated to:`)
        //console.log(legend)
        return legend;
      }, {})
      //console.log("Generated encoding legend: ");
      //console.log(encodingLegend);
      //==================================================================================================================
      //console.log(inputArray)
      subbedArray = inputArray.reduce((subs, inputChar) => { //Create array with encoded characters
        if (inputChar === " ") {
          subs.push(" ");
          //console.log("Pushed in a space...")
        } else {
          const charLowerCased = inputChar.toLowerCase();
          //console.log(`charLowerCased: ${charLowerCased}`);
          subs.push(encodingLegend[charLowerCased]);
          //console.log(`Encoded ${charLowerCased} into ${encodingLegend[charLowerCased]}`)
        };
        return subs;
      }, [])
    } else { //Decoding===================================================================================================
      //console.log("====DECODING====");
      //Create a legend for decoding from the provided alphabet; e.g., { subLetter : a }==================================
      let orderedLetterCode = 97;
      const decodingLegend = alphabetArray.reduce((legend, char) => {
        const orderedLetter = String.fromCharCode(orderedLetterCode);
        legend[char] = orderedLetter;
        orderedLetterCode += 1;
        //console.log(`Transcribing legend... legend updated to:`)
        //console.log(legend)
        return legend;
      }, {})
      //console.log("Generated decoding legend: ");
      //console.log(decodingLegend);
      //==================================================================================================================
      subbedArray = inputArray.reduce((subs, inputChar) => { //Create array with decoded characters
        if (inputChar === " ") {
          subs.push(" ");
          //console.log("Pushed in a space...")
        } else {
          const charLowerCased = inputChar.toLowerCase();
          //console.log(`charLowerCased: ${charLowerCased}`);
          subs.push(decodingLegend[charLowerCased]);
          //console.log(`Decoded ${charLowerCased} into ${decodingLegend[charLowerCased]}`)
        };
        return subs;
      }, [])
    }
    //console.log(subbedArray);
    return subbedArray.join("");
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
