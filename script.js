import Carrito from "./Carrito.js";

document.addEventListener("DOMContentLoaded", function (event) {
  fetch("https://jsonblob.com/api/1296178272311042048")
    .then((response) => response.json())
    .then((object) => {
      //Obtenemos el valor currency del JSON para tratarlo de forma dinámica
      const currency = object.currency;
      //creamos un objeto de la clase carrito vacio para el metodo de sumar todos los productos
      const carrito = new Carrito();
      //Creamos objetos de la clase Carrito de forma dinámica con el .map
      const arr = object.products.map(
        (product) =>
          new Carrito(
            product.title,
            product.SKU,
            product.price,
            product.quantity
          )
      );

      // Función para actualizar la fila de producto
      function actualizarFilaProducto(
        carrito,
        quantityInput,
        total,
        lineaPorProducto
      ) {
        quantityInput.value = carrito.getQuantity; // Actualizamos el input de cantidad
        total.textContent = `${carrito.precioTotal().toFixed(2)}${currency}`; // Actualizamos el total de la fila
        if (carrito.getQuantity > 0) {
          lineaPorProducto.innerHTML = `${carrito.getQuantity} x ${carrito.getTitle}<span>${carrito.getQuantity} x ${carrito.getPrice}${currency}</span>`;
        } else {
          lineaPorProducto.textContent = ""; // Si la cantidad es 0, limpiamos la línea
        }
        actualizarTotal(); // Actualizamos el total general del carrito
      }
      // Función para añadir una fila de producto en la tabla
      function addRow(carrito) {
        const principal = document.getElementById("table");

        // Creamos una nueva fila
        const row = document.createElement("tr");
        //Creamos las celdas
        const modelo = document.createElement("td");
        const cantidad = document.createElement("td");
        const precio = document.createElement("td");
        const total = document.createElement("td");

        // Obtenemos los valores directamente desde el objeto carrito
        modelo.innerHTML = `
      <span class="product-name">${carrito.getTitle}</span>
      <br>
      <span class="product-ref">Ref: ${carrito.getSku}</span>
    `;

        // Creamos la estructura de los botones de cantidad
        cantidad.innerHTML = `
      <div class="quantity-selector">
        <button class="quantity-btn restar">-</button>
        <input type="number" value="${carrito.getQuantity}" class="quantity-input" readonly>
        <button class="quantity-btn sumar">+</button>
      </div>
    `;

        // Mostrar el precio y el total
        precio.textContent = `${carrito.getPrice}${currency}`;
        total.textContent = `${carrito.precioTotal().toFixed(2)}${currency}`; //el precio solo con dos decimales
        // Agregamos las celdas a la fila
        row.append(modelo, cantidad, precio, total);

        // Agregamos la fila a la tabla
        principal.appendChild(row);

        // Agregamos la línea de producto a la lista de totales
        const container = document.querySelector(".cart-total-ul");
        const lineaPorProducto = document.createElement("li");
        container.appendChild(lineaPorProducto);

        // Obtener los botones de sumar y restar
        const btnSumar = row.querySelector(".sumar");
        const btnRestar = row.querySelector(".restar");
        const quantityInput = row.querySelector(".quantity-input");

        // Eventos para sumar/restar producto
        btnSumar.addEventListener("click", () => {
          carrito.sumarProducto(); // Incrementar la cantidad
          //llamamos a la funcion actualizar para actualizar toda la info en cada pulsacion
          actualizarFilaProducto(
            carrito,
            quantityInput,
            total,
            lineaPorProducto
          );
        });

        btnRestar.addEventListener("click", () => {
          if (carrito.getQuantity > 0) {
            carrito.restarProducto(); // Decrementar la cantidad
          }
          //llamamos a la funcion actualizar para actualizar toda la info en cada pulsacion
          actualizarFilaProducto(
            carrito,
            quantityInput,
            total,
            lineaPorProducto
          );
        });
      }

      // Elementos relacionados con el total del carrito
      const totalCarrito = document.querySelector(".cart-total-ul");
      const sumaTotal = document.createElement("li");
      sumaTotal.classList.add("cart-total-total");
      totalCarrito.appendChild(sumaTotal);

      // Función para actualizar el total siempre al final
      function actualizarTotal() {
        sumaTotal.innerHTML = `TOTAL: <span>${carrito.sumaTodos(
          arr
        )}${currency}</span>`;
        totalCarrito.appendChild(sumaTotal); // Mover el total al final así siempre aparece el total en el ultimo <li></li>
      }

      // Inicializamos las filas de la tabla
      arr.forEach(addRow);

      //Mostramos el total en un inicio
      actualizarTotal();
    })
    .catch((error) =>
      console.error("Error al cargar los datos del carrito:", error)
    );
});
