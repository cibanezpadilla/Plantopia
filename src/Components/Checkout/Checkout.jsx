import { useContext, useState } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, documentId, writeBatch, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import { Link, Navigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from 'yup'
import './Checkout.scss'
import Swal from 'sweetalert2'



const schema = Yup.object().shape({
    nombre: Yup.string()
                .min(3, "The name is too short")
                .max(20, "Maximum 20 characters")
                .required("This field is mandatory"),
    apellido: Yup.string()
                .min(3, "The surname is too short")
                .max(20, "Maximum 20 characters")
                .required("This field is mandatory"),
    telefono: Yup.string()
                .min(3, "The phone number is too short")
                .max(20, "The phone number is too long")
                .matches(/^[0-9]+$/, 'The phone number can only contain numerical digits')
                .required("This field is mandatory"),
    direccion: Yup.string()
                .min(6, "La direccion es demasiado corta")
                .max(30, "Maximum 30 characters")
                .required("This field is mandatory"),
    email: Yup.string()
                .required("This field is mandatory")
                .email("Invalid email"),
    email2: Yup.string()
                .oneOf([Yup.ref('email'), null], 'Emails do not match')
                .required('This field is mandatory'),
                
})


const Checkout = () => {
    const { cart, totalCompra, vaciarCarrito } = useContext(CartContext)

    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState(null)

    const handleSubmit = async (values) => {
        setLoading(true)
       
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

            Swal.fire({
                icon: "success",
                title: "Successful purchase!",
                text: `Thank you, ${values.nombre}, for shopping at Plantopia! We will keep in touch with you at ${values.email}`,
                iconColor: "#E2B2AE",
                confirmButtonText: "Accept",
                confirmButtonColor: "#000000",
              });

        } else {
            Swal.fire({
                title: "Warning!",
                text: "There are items out of stock",
                icon: "warning",
                iconColor: "#E2B2AE",
                confirmButtonText: "Accept",
                confirmButtonColor: "#000000",
              });            
        }
       
        setLoading(false)
    }



    if (orderId) { 
        return (
            <div className="checkout_section">
                <h2 className="checkout_title">CHECKOUT</h2>
                <hr/>
                <div className="succesfully-div">
                    <h2 className="succesfully-text">Your purchase was successfully registered!</h2>                
                    <p className="succesfully-order">Your order number is: <strong>{orderId}</strong></p>                    
                </div>
                <hr />
                <div className="back-home_container">
                    <Link to="/" className="back-home">Back Home</Link>   
                </div>
                             
            </div>
        )        
    }
    

    if (cart.length === 0 ) {
        return <Navigate to="/"/>
    }




    
    return (
        <div className="checkout_section">
            <h2 className="checkout_title">CHECKOUT</h2>
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
                    <Form className="form">
                        <Field placeholder="Name" className="form_field mt-6" type="text" name="nombre"/>
                        <ErrorMessage name="nombre" component="p"/>
                        <Field placeholder="Surname" className="form_field mt-6" type="text" name="apellido"/>
                        <ErrorMessage name="apellido" component="p"/>
                        <Field placeholder="Phone" className="form_field mt-6" type="text" name="telefono"/>
                        <ErrorMessage name="telefono" component="p"/>
                        <Field placeholder="Address" className="form_field mt-6" type="text" name="direccion"/>
                        <ErrorMessage name="direccion" component="p"/>
                        <Field placeholder="Email" className="form_field mt-6" type="email" name="email"/>
                        <ErrorMessage name="email" component="p"/>
                        <Field placeholder="Confirm your email" className="form_field mt-6" type="email" name="email2"/>
                        <ErrorMessage name="email2" component="p"/>
                        <button type="submit" className="send" disabled={loading}>Send</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Checkout