import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, documentId, writeBatch, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link, Navigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import './Checkout.scss'


const schema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, "El nombre es demasiado corto")
                .max(20, "Máximo 20 caracteres")
                .required("Este campo es obligatorio"),
    direccion: Yup.string()
                .min(6, "La direccion es demasiado corta")
                .max(20, "Máximo 20 caracteres")
                .required("Este campo es obligatorio"),
    email: Yup.string()
                .required("Este campo es obligatorio")
                .email("El email es inválido"),
    email2: Yup.string()
                .oneOf([Yup.ref('email'), null], 'Las contraseñas no coinciden')
                .required('Este campo es requerido'),
                
})


const Checkout = () => {
    const { cart, totalCompra, vaciarCarrito } = useContext(CartContext)

    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const handleSubmit = async (values) => {
        setLoading(true)
        // validaciones de formulario
        // if (!validaciones) return

        const orden = {
            cliente: values,
            items: cart.map(item => ({id: item.id, precio: item.precio, cantidad: item.cantidad, tamanio: item.tamanioSeleccionado, nombre: item.nombre})),
            total: totalCompra(),
            fyh: new Date()
        }

        const batch = writeBatch(db)
        const ordersRef = collection(db, "orders")
        const productosRef = collection(db, "productos")
        const q = query(productosRef, where( documentId(), "in", cart.map(item => item.id) ))

        const productos = await getDocs(q)
        const outOfStock = []

        productos.docs.forEach((doc) => {
            const tamaniosData = doc.data().tamanios;
        
            cart.forEach((item) => {
                const tamanioSeleccionado = tamaniosData.find(tamanio => tamanio.value === item.tamanioSeleccionado);
                if (tamanioSeleccionado) {
                    const stock = tamanioSeleccionado.stock;
        
                    if (stock >= item.cantidad) {
                        const updatedStock = stock - item.cantidad;
                        const index = tamaniosData.findIndex(tamanio => tamanio.value === item.tamanioSeleccionado);
                        if (index !== -1) {
                            tamaniosData[index].stock = updatedStock;
                            batch.update(doc.ref, { tamanios: tamaniosData });
                        }
                    } else {
                        outOfStock.push(item);
                    }
                }
            });
        });



        if (outOfStock.length === 0) {
            await batch.commit()
            const doc = await addDoc(ordersRef, orden)

            vaciarCarrito()
            setOrderId(doc.id)
        } else {
            alert("Hay items sin stock")
            console.log(outOfStock)
        }
       
        setLoading(false)
    }

    if (orderId) {
        return (
            <div className="container my-5">
                <h2 className="text-4xl">Your purchase was successfully registered!</h2>
                <hr/>
                <p>Your order number is: <strong>{orderId}</strong></p>

                <Link to="/">Back Home</Link>
            </div>
        )
    }

    if (cart.length === 0 ) {
        return <Navigate to="/"/>
    }




    
    return (
        <div className="container my-5">
            <h2>Checkout</h2>
            <hr/>

            <Formik
                initialValues={{
                    nombre: '',
                    direccion: '',
                    email: '',
                    email2: ''
                }}
                onSubmit={handleSubmit}
                validationSchema={schema}
            >
                {() => (
                    <Form>
                        <Field placeholder="Tu nombre" className="form-control my-2" type="text" name="nombre"/>
                        <ErrorMessage name="nombre" component="p"/>
                        <Field placeholder="Tu direccion" className="form-control my-2" type="text" name="direccion"/>
                        <ErrorMessage name="direccion" component="p"/>
                        <Field placeholder="Tu email" className="form-control my-2" type="email" name="email"/>
                        <ErrorMessage name="email" component="p"/>
                        <Field placeholder="Confirm your email" className="form-control my-2" type="email" name="email2"/>
                        <ErrorMessage name="email2" component="p"/>
                        <button type="submit" className="btn btn-success" disabled={loading}>Enviar</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Checkout