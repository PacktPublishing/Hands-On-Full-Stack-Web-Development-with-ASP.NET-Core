enum Operand {
	Sum, Subtract, Multiply, Divide
}

interface Calculable {
	left: number;
	right: number;
	operand?: Operand;
}

interface PersistedCalculable extends Calculable {
	shouldSaveInHistory: boolean;
}

class Calculator1 {
	sum(left: number, right: number): number {
		return left + right;
	}
}

class SumCalculator1 {
  protected history: Calculable[] = [];
  
  constructor(private saveHistory: boolean) { }
  
	sum(left: number, right: number): number {
		return this.calcCore(left, right);
  }
  
	private calcCore(left: number, right: number): number {
		if (this.saveHistory) this.history.push({left, right});
		return left + right;
  }
}

const sumC1 = new SumCalculator1(true);
console.log(sumC1.sum(2, 3));

class SumCalculator2 {
	static readonly supportedOperand = Operand.Sum;
	private _history: Calculable[] = [];
	get history() { return this._history; }
	set history(value: Calculable[]) {
		this._history = value || [];
	}	
	constructor(private readonly logPrefix: string) { }
	logHistory() {
		console.log(`${this.logPrefix}: current history length: ${this.history.length}`);
	}
}

const sumC2 = new SumCalculator2('TS');
sumC2.history = [{left: 2, right: 3}];
sumC2.logHistory();

interface Calculator2 {
	calc(left: number, right: number): number;
}
interface Printable {
	print();
}
class HistoryCalculator {
	protected history = [];
  protected logHistory() {
		console.log(`current history length: ${this.history.length}`);
	}
}
class SumCalculator3 extends HistoryCalculator implements Calculator2, Printable {
	calc(left: number, right: number): number {
		this.history.push({left, right});
		return left + right;
  }
  print() {
      this.logHistory();
  }
}

const sumC3 = new SumCalculator3();
console.log(sumC3.calc(1, 5));
sumC3.print();
