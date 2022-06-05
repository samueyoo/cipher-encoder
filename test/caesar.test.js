const { caesar } = require("../src/caesar.js");
const expect = require("chai").expect;

describe("Either encodes or decodes a string by shifting characters over by an inputted value", () => {
    it("Returns false if shift value is missing", () => {
        const message = "Testing";
        const actual = caesar(message);
        expect(actual).to.be.false;
    })
    it("Returns false if shift value is 0", () => {
        const actual = caesar("Testing", 0);
        expect(actual).to.be.false;
    })
    it("Returns false if shift value is < -25", () => {
        const actual = caesar("Testing", -26)
        expect(actual).to.be.false;
    })
    it("Returns false if shift value is > 25", () => {
        const actual = caesar("Testing", 26)
        expect(actual).to.be.false;
    })
    it("Correctly encodes string with capital letters", () => {
        const expected = "wklqnixo";
        const actual = caesar("Thinkful", 3);
        expect(actual).to.equal(expected);
    })
    it("Correctly decodes string with capital letters", () => {
        const expected = "thinkful";
        const actual = caesar("Wklqnixo", 3, false);
        expect(actual).to.equal(expected);
    })
    it("Correctly handles and retains spaces and other nonalphabetic symbols when encoding", () => {
        const expected = "q@efkhcr i";
        const actual = caesar("T@hinkfu l", -3);
        expect(actual).to.equal(expected);
    })
    it("Correctly handles and retains spaces and other nonalphabetic symbols when decoding", () => {
        const expected = "t@hinkfu l";
        const actual = caesar("q@efkhcr i", -3, false);
        expect(actual).to.equal(expected);
    })
    it("Correctly encodes string when positive shift value would surpass UTF-16 value 122", () => {
        const expected = "whvwb";
        const actual = caesar("Testy", 3);
        expect(actual).to.equal(expected);
    })
    it("Correctly encodes string when negative shift value would go below UTF-16 value 97", () => {
        const expected = "qefkhcriy";
        const actual = caesar("Thinkfulb", -3);
        expect(actual).to.equal(expected);
    })
    it("Correctly decodes string when positive shift value would surpass UTF-16 value 122", () => {
        const expected = "testy";
        const actual = caesar("whvwb", 3, false);
        expect(actual).to.equal(expected);
    })
    it("Correctly decodes string when negative shift value would go below UTF-16 value 97", () => {
        const expected = "thinkfulb";
        const actual = caesar("qefkhcriy", -3, false);
        expect(actual).to.equal(expected);
    })
})