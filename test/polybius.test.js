const { polybius } = require("../src/polybius.js");
const expect = require("chai").expect;

describe("Encodes letters into digit pairs and decodes digit pairs into letters", () => {
    it("Correctly encodes i and j as 42", () => {
        const expected = "4242";
        const actual = polybius("ij");
        expect(actual).to.equal(expected);
    })
    it("Correctly decodes 42 to (i/j)", () => {
        const expected = "(i/j)";
        const actual = polybius("42", false);
        expect(actual).to.equal(expected);
    })
    it("Correctly encodes when string contains capital letters", () => {
        const expected = "4444";
        const actual = polybius("Tt");
        expect(actual).to.equal(expected);
    })
    it("Correctly retains spaces when encoding", () => {
        const expected = "11 11";
        const actual = polybius("a a");
        expect(actual).to.equal(expected);
    })
    it("Correctly retains spaces when decoding", () => {
        const expected = "a   a  a";
        const actual = polybius("11   11  11", false);
        expect(actual).to.equal(expected);
    })
})