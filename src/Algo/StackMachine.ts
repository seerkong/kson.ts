export class StackMachine<T> {
    private frameBottomIdxStack_: number[] = [];
    private items_ : T[] = [];
    private stackTop_ = -1;

    constructor(createInitFrame = false) {
        if (createInitFrame) {
            this.pushFrame();
        }
    }

    public get frameStackView() : T[] {
        let r : T[] = [];
        let currentFrameIdx = this.curFrameBottomIdx();
        if (currentFrameIdx <= this.stackTop_) {
            for (let i = currentFrameIdx; i <= this.stackTop_; i++) {
                r.push(this.items_[i]);
            }
        }
        return r;
    }

    

    public getCurTopIdx() {
        return this.stackTop_;
    }

    public swapByIndex(index1, index2) {
        let tmp1 : T = this.items_[index1];
        let tmp2 : T = this.items_[index2];
        this.items_[index1] = tmp2;
        this.items_[index2] = tmp1;
    }

    public getByIndex(idx) : T {
        return this.items_[idx];
    }

    public pushFrame() {
        this.frameBottomIdxStack_.push(this.stackTop_ + 1);
    }

    public jumpTo(valStackIdx) {
        let popTimes = this.stackTop_ - valStackIdx;
        for (let i  = 0; i < popTimes; i++) {
            this.popValue();
        }
    }

    public pushItems(items: T[]) {
        for (let i = items.length - 1; i >= 0; i--) {
            this.pushValue(items[i]);
        }
    }

    public pushValue(v : T) {
        if (this.items_.length <= (this.stackTop_ + 1)) {
            this.items_.push(v);
        }
        else {
            this.items_[this.stackTop_ + 1] = v;
        }
        this.stackTop_ += 1;
    }

    public popValue() : T {
        let top = this.items_.pop();
        this.stackTop_ -= 1;
        return top;
    }

    public peekTop() : T {
        let top = this.items_[this.stackTop_];
        return top;
    }

    public peekBottomOfCurFrames() : T {
        let bottom = this.items_[this.curFrameBottomIdx()];
        return bottom;
    }

    public peekBottomOfAllFrames() : T {
        let bottom = this.items_[0];
        return bottom;
    }

    public popFrameAllValues() : T[] {
        let r: T[] = [];
        let currentFrameIdx = this.frameBottomIdxStack_.pop();
        let frameValCnt = this.stackTop_ - currentFrameIdx + 1;
        if (frameValCnt >= 0) {
            for (let i = 0; i < frameValCnt; i++) {
                let v = this.popValue();
                r.unshift(v);
            }
        }
        return r;
    }

    public popFrameAndPushTopVal() {
        let frameValues: T[] = this.popFrameAllValues();
        if (frameValues.length > 0) {
            this.pushValue(frameValues[frameValues.length - 1]);
        }
    }

    public curFrameBottomIdx() : number {
        return this.frameBottomIdxStack_[this.frameBottomIdxStack_.length - 1];
    }
}