# Entrega Final React-IbanezPadilla
# Plantopia


## Funcionalidades adicionales del proyecto
Cada producto tiene un selector de tamaño, y cada tamaño tiene un precio y un stock determinado.
Es posible agregar un item al carrito, y luego seguir agregando más cantidad del mismo (no coloqué el botón de terminar compra una vez que se agregó el item al carrito).
Cuando un producto está agregado al carrito en determinado talle, hay un mensaje que recuerda al usuario la cantidad de items en ese tamaño que ya tiene agregados en carrito. 
Si no hay más stock de determinado tamaño, sale un mensaje que sugiere chequear los demas tamaños, y también sale el mensaje que indica si hay items en el carrito en ese tamaño que ya no tiene stock.
Este mismo sistema de mensajes se visualiza en la pantalla de wishlist.



Cuando un producto está fuera de stock en Firebase, en el ItemList se ve un mensaje sobre la foto que avisa que el profucto está fuera de stock.


Cuando se ingresa una ruta no existente, se llega a una pantalla de Page not found, con un botón para volver al Home.


Cuando se ingresa una ruta de detalle de producto no existente, se llega a una pantalla de Product not found, con un botón para volver al Home.


WISHLIST
Para acceder a la wishlist se clickea en el ícono de corazon que se encuentra en el header.
Se pueden agregar productos a una Wishlist, tanto desde la vista del ItemDetailContainer, desde ItemDetail. Tiene un estado para agregar clickeando en el botón de corazon, y al volver a clickear se desagrega de la wishlist. En la wishlist se puede definir el tamaño y cantidad a agregar al carrito, asi como remover cada producto de la wishlist. Tambien es posible vaciar la wishlist completa y visualizar un mensaje de Wishlist vacía.
Desde la wishlist es posible clickear sobre la foto del producto y ser redirigido al ItemDetail.


En el header hay una barra de búsqueda. Se ingresa el nombre del producto a buscar y se presiona enter para disparar la función de búsqueda. Al presionar enter, vuelve a quedar vacío el campo del input.
En la versión mobile, para acceder a la barra de búsqueda se hace click en el ícono del header, y la función de búsqueda se dispara haciendo click en el ícono de lupa del modal. Al hacer click allí, vuelve a quedar vacío el campo del input y se cierra el modal.


En el carrito es posible clickear la imagen del producto y volver a la vista de ItemDetail correspondiente. 
Al hacer click en el botón de ClearCart, se visualiza una alerta que pregunta si deseas eliminar la cantidad de items que tenes en el carrito. Al confirmar aparece otra alerta que confirma la cantidad de items que fueron eliminados. 


En el formulario de checkout, incluí el campo teléfono, configurando un schema de valicación para que sólo admita caracteres numéricos. 


Al enviar los datos y crearse la orden exitosamente, se dispara una alerta que agradece por la compra, citando el nombre del usuario, y confirmando que se comunicarán via mail, citando el mail del usuario.



## Librerías implementadas
En mi proyecto implementé las librerías vistas en clase y ademas SweetAlert y Toastify, para las alertas y notificaciones.


