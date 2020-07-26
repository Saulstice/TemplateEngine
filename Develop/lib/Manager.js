const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNum){
        super(name, id, email);
        this.officeNumber = officeNum;
        this.role = "Manager"; 
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;