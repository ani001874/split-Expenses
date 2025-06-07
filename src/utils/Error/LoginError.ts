import BaseError from "./BaseError";

class LoginError extends BaseError {
  emailPattern: RegExp = /^[\w\.]+@([\w]+\.)+[\w]{2,4}$/g;
  passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/g;

  constructor(args: {
    required?: boolean;
    min?: number;
    max?: number;
    inputVal: string;
    type:string
  }) {
    super(args);
   
  }

  checkEmail():boolean {
     if(!this.emailPattern.test(this.inputVal)) {
        return false;
     }
     return true;
  }


  checkPassword():boolean {
      if(!this.passwordPattern.test(this.inputVal)) return false;
      else return true;
  }

  override validate(): { valid: boolean; message?: string } {
    const baseValidation = super.validate();
    console.log(baseValidation)
    if (!baseValidation.valid) {
      return baseValidation;
      
    }

     if(this.type === "email") {
         if(this.inputVal.includes("@")) {
            console.log("hello from inside validate email", this.checkEmail())
           if(!this.checkEmail()) {
              return {valid:false, message:"Enter a valid email address."}
           }
         }else {
             return {valid:false,message:"email must contains '@' key."}
         }
     }

     if(this.type === "password" ) {
        if(!this.checkPassword()) {
           return {valid:false, message:"Passeord must contain one uppercase, lowercase and digit"}
        }
     }
    return { valid: true, message: "" };
  }
  
}


export default  LoginError
