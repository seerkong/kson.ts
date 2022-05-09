
import { Parser } from '../src/Parser/Parser';
// import { describe, it } from "mocha";
import assert from "assert";

describe("parser", function() {
  // describe("number", function() {
  //   it("float number", function() {
  //     let v = Parser.parse("5.321");
  //     console.log(v)
  //     assert.equal(v, 5.321);
  //   });
  // });

  // describe("word", function() {
  //   it("word", function() {
  //     let v = Parser.parse(" [a] ");
  //     console.log(v)
  //   });
  // });

  describe("list", function() {
    it("list", function() {
      let v = Parser.parse("(ff a [ 1 , 2 , 3 ])");
      console.log(v)
    });
  });
});
