class Bubu {
  public name: string;
  public age: number;
  public car: string;

  constructor(name: string, age: number, car: Car) {
    this.name = name;
    this.age = age;
    this.car = car.toString();
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

// tslint:disable-next-line: max-classes-per-file
class Car {
  public manufacturer: string;
  public model: string;

  constructor(manufacturer: string, model: string) {
    this.manufacturer = manufacturer;
    this.model = model;
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

const car1 = new Car('tesla', 'model x');
const bubu = new Bubu('bobby', 28, car1);

const value = bubu.toString();

console.log(value);
