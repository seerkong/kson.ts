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

        it("add", function() {
            let code = parseFile('math/add.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 7);
        });
    });

    describe("Env", function() {
        it("DeclareVar", function() {
            let code = parseFile('env/declare_var.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 5);
        });

        it("SetVar", function() {
            let code = parseFile('env/set_var.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 6);
        });
    });

    describe("IfElse", function() {
        it("IfWithTrueFalseBranch", function() {
            let code = parseFile('ifelse/if_with_true_false_branch.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, true);
        });
        it("NoElseBranch", function() {
            let code = parseFile('ifelse/no_else_branch.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, true);
        });
        it("IfCheckFailNoElseBranch", function() {
            let code = parseFile('ifelse/if_check_fail_no_else_branch.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, false);
        });
        it("IfCheckFailJumpToElseBranch", function() {
            let code = parseFile('ifelse/if_check_fail_jump_to_else_branch.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, true);
        });
    });

    describe("Condition", function() {
        it("CondTrueBranch", function() {
            let code = parseFile('cond/cond1.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 2);
        });
        it("CondElseBranch", function() {
            let code = parseFile('cond/cond2.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 3);
        });
    });

    describe("Foreach", function() {
        it("ForeachArr", function() {
            let code = parseFile('foreach/foreach_arr.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 3);
        });
    });

    describe("Func", function() {
        it("AddWith4Args", function() {
            let code = parseFile('func/add_with_4_args.ks');
            let interp: Interpreter = new Interpreter();
            let r = interp.exec(code);
            assert.equal(r, 10);
        });
    });
});