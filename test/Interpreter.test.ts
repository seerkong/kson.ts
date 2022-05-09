import { Interpreter } from '../src/Interpreter';
import { Parser } from '../src/Parser/Parser';
// import { describe, it } from "mocha";
import assert from "assert";
import fs from 'fs'

const BASE_DIR = './test/dataset'

function parseFile(fileName: string) {
    const ksonStr = fs.readFileSync(`${BASE_DIR}/${fileName}`, 'utf-8')
    let node = Parser.parse(ksonStr);
    return node;
}

describe("Interpreter", function() {
    describe("HostFunction", function() {
        it("writeln", function() {
            let code = parseFile('io/writeln.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 3);
        });
    });
});