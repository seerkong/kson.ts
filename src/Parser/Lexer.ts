
import { Token, TokenType } from "./Token";



export class Lexer {
    private text : string;
    private pos : number;
    private currentChar;

    constructor(text) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }

    static create(text) {
        return new this(text);
    }

    error() {
        throw new Error('Lexical error');
    }

    advance() {
        if (this.pos > this.text.length - 1) {
            this.error();
        }

        this.pos++;
        this.currentChar = this.text[this.pos];
    }

    skipWhitespaces() {
        while (this.currentChar && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }


    string() {
        let result = '';
        while (/[\w\"\s\\]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return result;
    }

    word() {
        let result = '';
        while (/[_a-zA-Z0-9]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return result;
    }

    number() {
        let result = '';
        while (/[\d\.]/.test(this.currentChar)) {
            result += this.currentChar;
            this.advance();
        }
        return Number(result);
    }

    boolean() {
        let expectedStr = '';
        if (this.currentChar === 'f') {
            expectedStr = 'false';
        } else if (this.currentChar === 't') {
            expectedStr = 'true';
        } else {
            this.error();
        }

        for (let i = 0; i < expectedStr.length; i++) {
            if (this.currentChar !== expectedStr[i]) {
                this.error();
            }
            this.advance();
        }

        return expectedStr === 'true';
    }

    getNextToken() {
        while (this.currentChar) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespaces();
                continue;
            }

            if (this.currentChar === '{') {
                this.advance();
                return Token.create(TokenType.BEGIN_MAP, '{')
            }

            if (this.currentChar === '}') {
                this.advance();
                return Token.create(TokenType.END_MAP, '}')
            }

            if (this.currentChar === '[') {
                this.advance();
                return Token.create(TokenType.BEGIN_ARRAY, '[');
            }

            if (this.currentChar === ']') {
                this.advance();
                return Token.create(TokenType.END_ARRAY, ']');
            }

            if (this.currentChar === '(') {
                this.advance();
                return Token.create(TokenType.BEGIN_LIST, '(');
            }

            if (this.currentChar === ')') {
                this.advance();
                return Token.create(TokenType.END_LIST, ')');
            }

            if (this.currentChar === ':') {
                this.advance();
                return Token.create(TokenType.COLON, ':');
            }

            if (this.currentChar === ',') {
                this.advance();
                return Token.create(TokenType.COMMA, ',');
            }

            if (/\d/.test(this.currentChar)) {
                return Token.create(TokenType.NUMBER, this.number());
            }

            if (/\"/.test(this.currentChar)) {
                return Token.create(TokenType.STRING, this.string());
            }

            if (/[_a-zA-Z]/.test(this.currentChar)) {
                let wordStr = this.word();
                if (wordStr === 'true' || wordStr === 'false') {
                    return Token.create(TokenType.BOOLEAN, wordStr);
                }
                else {
                    return Token.create(TokenType.WORD, wordStr);
                }
            }

            this.error();
        }

        return Token.create(TokenType.EOF);
    }
}
