//siempre tener cuidado con el any ya que no signifca que puede ser cualquier tipo sino que va mas alla, directamente le decimos que ignore el tipado.

const persona = {
  name: 'Iñaki',
  age: 20,
  job: 'Developer',
};

persona.name;

function saludar(nombre: string) {
  console.log(`Hola ${nombre.toUpperCase()}`);
}

function suma(a: number, b: number): number {
  return a + b;
}

function edad({ name, age }: { name: string; age: number }) {
  console.log(`Mi nombre es ${name} y tengo ${age} años`);
}

function sayHi(fn: (name: string) => void) {
  fn('Iñaki');
}

sayHi((name: string) => {
  console.log(`Hola ${name}`);
});

//tipo never
//esto nunca va a devolver nada
function throwError(): never {
  throw new Error();
}

//type alias y optional properties
type Hero = {
  name: string;
  age: number;
  job: string;
  power?: Power;
};

const thor: Hero = {
  name: 'Thor',
  age: 42,
  job: 'God',
  power: 'hammer',
};

function createHero(
  name: string,
  age: number,
  job: string,
  power: Power
): Hero {
  return {
    name,
    age,
    job,
    power,
  };
}

const spiderman = createHero('Spiderman', 16, 'Web Developer', 'hammer');

//optional chaining
spiderman.power?.toLowerCase();

//union types
type Power = 'hammer' | 'sword';

//intersection types
type HumanName = {
  name: string;
};

type HumanAge = {
  age: number;
};

type Human = HumanName & HumanAge;

const persona2: Human = {
  name: 'Iñaki',
  age: 20,
};

//type indexing
type CityProps = {
  name: string;
  population: number;
  country: {
    name: string;
    capital: string;
  };
};

const city: CityProps['population'] = 1000000;

const city2: CityProps['country']['name'] = 'Spain';

//type from value
const address = {
  street: 'Calle de la República',
  number: 123,
  city: 'Madrid',
  country: 'Spain',
};

type Address = typeof address;

const argentina: Address = {
  street: 'Calle de la República',
  number: 123,
  city: 'Buenos Aires',
  country: 'Argentina',
};

const deporte = 'futbol';

type deporte = typeof deporte;

const miDeporte: deporte = 'futbol';

function human() {
  return { name: 'Iñaki', age: 20 };
}

type Person = ReturnType<typeof human>;

//arrays
const languages: string[] = ['typescript', 'javascript', 'java'];

languages.push('python');

const cities: (string | number)[] = [];

const asignatures: string[] | number[] = [];

//unificacion
type Cells = 'x' | 'o' | '';
type GameBoard = [
  [Cells, Cells, Cells],
  [Cells, Cells, Cells],
  [Cells, Cells, Cells]
];

const gameBoard: GameBoard = [
  ['', '', 'x'],
  ['', 'x', 'x'],
  ['o', '', 'x'],
];

//generics
function giveSomething<T>(something: T): T {
  return something;
}

giveSomething<string>('pepe');
giveSomething<number>(10);
giveSomething<boolean>(true);

interface Product<T> {
  name: string;
  price: number;
  quantity: T;
}

function createProduct<T>({ name, price, quantity }: Product<T>): Product<T> {
  return { name, price, quantity };
}

createProduct({ name: 'pepe', price: 10, quantity: 'uno' });
createProduct({ name: 'pepe', price: 10, quantity: 1 });

//keyof
const sonidos = {
  perro: 'woof',
  gato: 'meow',
  llama: 'baa',
};

type Sonidos = keyof typeof sonidos;

const sonidoPerro: Sonidos = 'perro';

//enums
const enum Color {
  RED,
  GREEN,
  BLUE,
}

function generateColor(): Color {
  return Color.BLUE;
}

//type assertion
// const input = querySelector("input");

// if (input instanceof HTMLInputElement) {
//   console.log(input.value);
// }

//narrowing
function mostrarLongitud(objeto: string | number) {
  if (typeof objeto === 'string') {
    console.log(objeto.length);
  } else {
    console.log(objeto);
  }
}

interface Mario {
  company: 'Nintendo';
  nombre: string;
  saltar: () => void;
}

interface Sonic {
  company: 'Sega';
  nombre: string;
  correr: () => void;
}

type Personaje = Mario | Sonic;

function jugar(personaje: Personaje) {
  if (personaje.company === 'Nintendo') {
    personaje.saltar();
    return;
  }

  personaje.correr();
}

//utility types

interface Components {
  procesador: string;
  ram: number;
  hdd: number;
  motherboard: string;
  GPU: string;
}

type Procesador = Pick<Components, 'procesador'>;

type OmitirMotherboard = Omit<Components, 'motherboard'>;

interface PersonProps<T extends object> {
  data: T;
}

const inaki: PersonProps<{ name: string; age: number }> = {
  data: {
    name: 'Iñaki',
    age: 20,
  },
};

console.log(inaki);
