export default class Carrito {
  //variables clase carrito privadas
  #title;
  #SKU;
  #price;
  #quantity;
  //Constructor vacio para crear objetos vacios
  constructorVacio() {}
  //constructor con todo con limitacion en la cantidad
  constructor(title, SKU, price, quantity) {
    this.#title = title;
    this.#SKU = SKU;
    this.#price = Number(price);
    this.#quantity = Number(quantity);
    if (quantity == undefined) {
      this.#quantity = 0;
    }
  }
  //geters and setters
  get getTitle() {
    return this.#title;
  }

  set setTitle(title) {
    this.#title = title;
  }

  get getSKU() {
    return this.#SKU;
  }

  set setSKU(SKU) {
    this.#SKU = SKU;
  }

  get getPrice() {
    return this.#price;
  }

  set setPrice(price) {
    this.#price = price;
  }

  get getQuantity() {
    return this.#quantity;
  }

  set setQuantity(quantity) {
    this.#quantity = quantity;
  }
  //funcion para sumar cantidad
  sumarProducto() {
    return (this.#quantity += 1);
  }
  //funcion para restar cantidad
  restarProducto(quantity) {
    return (this.#quantity -= 1);
  }
  //devuelve el precio de total de los productos de un elemento
  precioTotal() {
    return this.#price * this.#quantity;
  }
  //devuelve la suma de todos los productos del carrito
  sumaTodos(array) {
    let sumaTodo = 0;
    for (const ele of array) {
      sumaTodo += ele.precioTotal();
    }
    return sumaTodo.toFixed(2); //solo dos decimales
  }
}
