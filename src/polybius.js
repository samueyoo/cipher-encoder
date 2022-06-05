const polybiusModule = (function () {
  
  const encodingLegend = {a:11, b:21, c:31, d:41, e:51, f:12, g:22, h:32, i:42, j:42, k:52, l:13, m:23, n:33, o:43, p:53, q:14, r:24, s:34, t:44, u:54, v:15, w:25, x:35, y:45, z:55};
  let decodingLegend = {}; //Automatically generate a legend for decoding, based on the encoding legend
  const decodingKeysSpread = Object.keys(encodingLegend);
  const decodingValuesSpread = Object.values(encodingLegend);
  decodingValuesSpread.forEach((property, index) => {
    if (property == 42) {
      decodingLegend[property] = "(i/j)";
    } else {
      decodingLegend[property] = decodingKeysSpread[index];
    }
  });
  //console.log(decodingLegend);

  function polybius(input, encode = true) {
    if (!input) return false; //Guard line for if input is missing'
    let inputArray= [];
    //console.log(`Initializing inputArray: ${inputArray}`);
    if (!encode) {
      //console.log("===Decoding is selected===");
      const inputTempArray = Array.from(input); //Create a temporary array directly from input to filter out spaces and check length
      //console.log(`inputTestArray: ${inputTestArray}`)
      const inputNoSpacesLengthCheck = inputTempArray.filter(digit => !(digit === " ")); //Filter out spaces from temp array to check length
      //console.log(`Input array has been filtered without spaces: ${inputNoSpacesLengthCheck}`);
      if (!(inputNoSpacesLengthCheck.length % 2 === 0)) return false; //Check if length of all numbers is odd
      //console.log("Input is divisible by 2");
      //console.log("==========================");
      for (let i = 0; i < input.length; i++) { //Loop through input string, pushing digit pairs and spaces into a new array
        //console.log(`Looping... Current element: ${input[i]}`)
        if (input[i] === " ") { //If a space is encountered during the for loop, push just the space as its own element
          inputArray.push(" ");
        } else { //If input[i] and the next digit are not spaces, push both input[i] and the next digit as an element, then skip the next i in the for loop
          //console.log(`No spaces detected... pushing ${input[i] + input[i+1]}`)
          inputArray.push(input[i] + input[i+1]);
          i += 1;
        };
      };
    } else {inputArray = Array.from(input)}; //Create an array directly from the input string
    //console.log(`inputArray is finalized: ${inputArray}`);
    const translatedArray = inputArray.reduce((translated, char) => {
      if (char === " ") {translated.push(" ")} //Pass through spaces as is
      else { //Execute code for any non-space characters
        if (encode) { //Encoding----------------------------------------
          const lowerCasedLetter = char.toLowerCase();
          translated.push(encodingLegend[lowerCasedLetter]);
        } else { //Decoding---------------------------------------------
          //console.log(`Decoding; current char: ${char} // Type: ${typeof char}`);
          const numericKey = char;
          translated.push(decodingLegend[numericKey]);
        };
      };
      return translated;
    }, []);
    //console.log(translatedArray.join(""));
    return translatedArray.join("");
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
