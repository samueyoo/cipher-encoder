const caesarModule = (function () {

  function caesar(input, shift, encode = true) {
    if (!shift || shift === 0 || shift < -25 || shift > 25) return false; //Checks for shift value outliers
    const inputArray = Array.from(input);
    const shiftedInputArray = inputArray.reduce((codedArray, letter) => {
      const letterCode = letter.charCodeAt(0); //Converts current iteration's character into UTF-16 code unit
      //console.log(`Start of iteration; letterCode = ${letterCode} / ${letter} / type of: ${typeof letterCode}`);
      //Check if character is NOT an alphabetical character; if not, push into collector array
      if (!(letterCode >= 65 && letterCode <= 90) && !(letterCode >= 97 && letterCode <= 122)) {
        //console.log(`Detected ${letter} as a non-alphabetical character. Pushing as is.`);
        codedArray.push(letter);
        return codedArray;
      } else { //If character IS an alphabetical character; make conversions
        const lowerCasedLetter = letter.toLowerCase(); //Convert to lower case letter
        const lowerCasedLetterCode = lowerCasedLetter.charCodeAt(0); //Convert to UTF-16 unit code
        //Check if encode is TRUE or FALSE; if TRUE, add shift; if FALSE, subtract shift
        if (encode) { //encode is TRUE-----------------------------------------
          //check if sum of char code and shift would dip below 97 or surpass 122
          const newCodeValue = lowerCasedLetterCode + shift;
          //console.log(`newCodeValue is ${newCodeValue}`);
          if (newCodeValue > 122) { //If sum would surpass 122, wrap around
            const wrapAroundLetterCode = newCodeValue - 26;
            //console.log(`newCodeValue is > 122; wrapping around to ${wrapAroundLetterCode}, AKA: ${String.fromCharCode(wrapAroundLetterCode)}`);
            codedArray.push(String.fromCharCode(wrapAroundLetterCode));
          } else if (newCodeValue < 97) { //If sum would dip below 97, wrap around
            //console.log(`newCodeValue is < 97; wrapping around to ${wrapAroundLetterCode}, AKA: ${String.fromCharCode(wrapAroundLetterCode)}`);
            const wrapAroundLetterCode = newCodeValue + 26;
            codedArray.push(String.fromCharCode(wrapAroundLetterCode));
          } else {codedArray.push(String.fromCharCode(newCodeValue))} //If sum neither dips/surpasses, use sum as is
        } else { //encode is FALSE----------------------------------------------
          //check if sum of char code and shift would dip below 97 or surpass 122
          const newCodeValue = lowerCasedLetterCode - shift;
          if (newCodeValue > 122) { //If sum would surpass 122, wrap around
            const wrapAroundLetterCode = newCodeValue - 26;
            codedArray.push(String.fromCharCode(wrapAroundLetterCode));
          } else if (newCodeValue < 97) { //If sum would dip below 97, wrap around
            const wrapAroundLetterCode = newCodeValue + 26;
            codedArray.push(String.fromCharCode(wrapAroundLetterCode));
          } else {codedArray.push(String.fromCharCode(newCodeValue))}; //If sum neither dips/surpasses, use sum as is
        };
      };
      return codedArray;
    }, []);
    //console.log(`Final array: ${shiftedInputArray}`);
    return shiftedInputArray.join("");
  }
  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
