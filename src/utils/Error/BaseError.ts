class BaseError {
  required: boolean;
  min: number;
  max: number;
  inputVal: string;
  type:string;

  constructor({
    required = false,
    min = -1,
    max = -1,
    inputVal,
    type,
  }: {
    required?: boolean;
    min?: number;
    max?: number;
    inputVal: string;
    type:string
  }) {
    this.required = required;
    this.min = min;
    this.max = max;
    this.inputVal = inputVal;
    this.type = type
  }

  isRequired(): boolean {
    if (!this.inputVal) return false;
    return true;
  }

  checkLength(): boolean {
    if (this.inputVal.length < this.min) return false;
    else return true;
  }

  validate(): { valid: boolean; message?: string } {
   
    if (!this.isRequired()) {
     
      return { valid: false, message: `${this.type} is required` };
    }

    if (this.min > 0 && this.max > 0) {
      if (!this.checkLength()) {
        return {
          valid: false,
          message: `This field contain more than ${this.min} character`,
        };
      }
    }

    return { valid: true, message: "" };
  }
}




export default BaseError;
