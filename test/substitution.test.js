const { substitution } = require("../src/substitution.js");
const expect = require("chai").expect;

describe("Substitutes characters of input based on provided alphabet legend", () => {
    const alphabet1 = "xoyqmcgrukswaflnthdjpzibev";
    it("Correctly returns false when alphabet is not exactly 26 characters long", () => {
        const actual = substitution("test", "abcd");
        expect(actual).to.be.false;
    });
    it("Correctly returns false if alphabet contains any duplicate characters", () => {
        const actual = substitution("test", "xoyqmcgrukswafffthdjpzibev");
        expect(actual).to.be.false;
    });
    it("Correctly encodes the given phrase, based on the alphabet, as well as ignoring capitals", () => {
        const expected = "jrufscpw";
        const actual = substitution("Thinkful", alphabet1);
        expect(actual).to.equal(expected);
    })
    it("Correctly decodes the given phrase, based on the alphabet, as well as ignoring capitals", () => {
        const expected = "thinkful";
        const actual = substitution("jruFscpw", alphabet1, false);
        expect(actual).to.equal(expected);
    })
    it("Correctly maintains spaces when encoding", () => {
        const expected = "jrufs cpw";
        const actual = substitution("think ful", alphabet1);
        expect(actual).to.equal(expected);
    })
    it("Correctly maintains spaces when decoding", () => {
        const expected = "think ful";
        const actual = substitution("jrufs cpw", alphabet1, false);
        expect(actual).to.equal(expected);
    })
})
