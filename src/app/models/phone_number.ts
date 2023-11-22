export class PhoneNumber {
    phoneNumber!: string;
 
  
    // format phone numbers as E.164
    get e164() {
      const num = this.phoneNumber;
      return `+222${num}`
    }
  
  }