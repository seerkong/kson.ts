
export enum TokenType {
    EOF,
    BEGIN_MAP,
    END_MAP,
    BEGIN_ARRAY,
    END_ARRAY,
    BEGIN_LIST,
    END_LIST,
    
    COLON,
    COMMA,
    STRING,
    WORD,
    NUMBER,
    BOOLEAN
}

export class Token {
    public type : TokenType;
    public value;
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    static get types() {
        return TokenType;
    }

    static create(type, value = null) {
        return new this(type, value);
    }
}
