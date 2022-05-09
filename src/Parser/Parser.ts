import { Token, TokenType } from "./Token";
import { Lexer } from "./Lexer";


export class Parser {
    private lexer : Lexer;
    private currentToken : Token;

    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    error() {
        throw new Error('Syntax error');
    }


    consume(expectedType : TokenType) {
        if (this.currentToken.type === expectedType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    string() {
        const str = this.currentToken.value.slice(1, -1);
        this.consume(TokenType.STRING);
        return str;
    }

    word() {
        const str = this.currentToken.value;
        this.consume(TokenType.WORD);
        return {
            __type: 'Word',
            value: str
        };
    }

    key() {
        return this.string();
    }

    number() {
        const num = this.currentToken.value;
        this.consume(TokenType.NUMBER);
        return num;
    }

    boolean() {
        const bool = this.currentToken.value;
        this.consume(TokenType.BOOLEAN);
        return bool;
    }

    value() {
        if (this.currentToken.type === TokenType.STRING) {
            return this.string();
        }

        if (this.currentToken.type === TokenType.WORD) {
            return this.word();
        }

        if (this.currentToken.type === TokenType.NUMBER) {
            return this.number();
        }

        if (this.currentToken.type === TokenType.BOOLEAN) {
            return this.boolean();
        }

        if (this.currentToken.type === TokenType.BEGIN_MAP) {
            return this.ksonMap();
        }

        if (this.currentToken.type === TokenType.BEGIN_ARRAY) {
            return this.ksonArray();
        }

        if (this.currentToken.type === TokenType.BEGIN_LIST) {
            return this.ksonList();
        }

        this.error();
    }

    ksonArray() {
        const array = [];
        this.consume(TokenType.BEGIN_ARRAY);

        array.push(this.value());

        while (this.currentToken.type === TokenType.COMMA) {
            this.consume(TokenType.COMMA);
            array.push(this.value());
        }

        this.consume(TokenType.END_ARRAY);
        return array;
    }

    ksonList() {
        const arr = [];
        this.consume(TokenType.BEGIN_LIST);

        arr.push(this.value());

        while (this.currentToken.type != TokenType.END_LIST
                && this.currentToken.type != TokenType.EOF) {
                    arr.push(this.value());
        }

        let result = null; // end of list
        for (let i = arr.length - 1; i >= 0; i--) {
            result = {
                __type : 'List',
                core: arr[i],
                next: result
            }
        }

        this.consume(TokenType.END_LIST);
        return result;
    }

    ksonMap() {
        const result = {};
        this.consume(TokenType.BEGIN_MAP);

        let keyVal = this.key();
        this.consume(TokenType.COLON);
        let val = this.value();
        result[keyVal] = val;

        while(this.currentToken.type === TokenType.COMMA) {
            this.consume(TokenType.COMMA);
            keyVal = this.key();
            this.consume(TokenType.COLON);
            val = this.value();
            result[keyVal] = val;
        }

        this.consume(TokenType.END_MAP);

        return result;
    }

    public parseRoot() {
        if (this.currentToken.type === TokenType.BEGIN_ARRAY) {
            return this.ksonArray();
        } else if (this.currentToken.type === TokenType.BEGIN_MAP) {
            return this.ksonMap();
        } else if (this.currentToken.type === TokenType.BEGIN_LIST) {
            return this.ksonList();
        }
    }

    static parse(text) {
        const lexer = new Lexer(text);
        const parser = new Parser(lexer);
        
        return parser.parseRoot();
    }
}

