// Model for storing Each Cell Data 

export default class Cell {
  constructor(name, value) {
    this.value = value || 0;
    this.name = name;
    if (value === ".") {
      this.value = 0;
    } else {
      this.value = parseInt(value, 10);
    }

    this.possibleValues = [];
  }
}
