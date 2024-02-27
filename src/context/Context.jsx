import { createContext, useContext, useState } from "react";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import Swal from "sweetalert2";

const firebaseConfig = {
    apiKey: "AIzaSyAe6A3fntQHNsrgL-FyRpOYpwHxSMenqtM",
    authDomain: "react-flex-57915.firebaseapp.com",
    projectId: "react-flex-57915",
    storageBucket: "react-flex-57915.appspot.com",
    messagingSenderId: "660644246128",
    appId: "1:660644246128:web:3a2ae27750707f4b5cbab5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const collectionRef = collection(db, "items");
const orderCollection = collection(db, "orders");

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {

    const [carrito, setCarrito] = useState([]);

    const [productos, setProductos] = useState([]);

    const [modalCarrito, setModalCarrito] = useState(false);

    function agregarAlCarrito(producto) {
        let carritoAuxiliar = [...carrito];

        if (carritoAuxiliar.some(el => el.id === producto.id)) {
            let indiceDelProducto = carritoAuxiliar.findIndex(el => el.id === producto.id);
            carritoAuxiliar[indiceDelProducto].cantidad += 1;
        } else {
            let nuevoProducto = {
                cantidad: 1,
                ...producto,
            }
            carritoAuxiliar.push(nuevoProducto);
        };


        setCarrito(carritoAuxiliar);

        Swal.fire({
            title: "Éxito",
            text: `Agregaste ${producto.name} a tu carrito`,
            icon: "success"
        })

        // alert("Producto agregado correctamente"); ESTE ALERT NO VA MÁS.
        // EL QUE USA ALERT, PIERDE

        console.log("Agregaste correctamente. Tu carrito se ve así: ", carritoAuxiliar);

        // // ESTO TAMBIÉN ERA VÁLIDO
        // setCarrito([...carrito, producto]);
    };

    function cargarProductos() {
        getDocs(collectionRef).then(snapshot => {
            let arrayProductos = snapshot.docs.map(element => {
                return {
                    // id: element.id,   ESTE PASO SE HACE SOLAMENTE SI SU OBJETO NO TIENE UN ID CREADO
                    ...element.data(),
                };
            });
            setProductos(arrayProductos);
        })
            .catch(err => console.log(err));
    };

    function crearOrden() {

        if (carrito.length > 0) {

            Swal.fire({
                title: "Estás seguro?",
                text: "Vas a generar una nueva orden",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Comprar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    const nuevaOrden = {
                        nombre: "Lucas",
                        telefono: 1234,
                        mail: "lucas@coder.com",
                        productos: carrito,
                    };
        
                    // Crear nuestro documento en la coleción ORDERS
        
                    addDoc(orderCollection, nuevaOrden).then(response => {
                        // console.log(response);
                        // console.log("------------------")
                        // console.log("Se creó la orden con el id: ", response.id);
                        Swal.fire({
                            title: "Listo",
                            text: `Tu orden fue generada correctamente con el id ${response.id}`,
                            icon: "success"
                        });
                    })
                        .catch(err => console.log(err));
        
                    // Limpiar carrito
        
                    setCarrito([]);
                    
                }
            });
        } else {
            alert("No podés crear una orden vacía.")
        }
    };

    function mostrarCarrito() {
        if (carrito.length === 0) {
            Swal.fire({
                title: "Nada que mostrar",
                text: `Tu carrito está vacío`,
                icon: "error"
                // icon: "error" TAMBIÉN EXISTE info, question, warning
            });
        } else {
            // Swal.fire({
            //     title: "Todo que mostrar",
            //     text: `Tu carrito está lleno`,
            //     icon: "success"
            // });
            setModalCarrito(true);
        };
    };

    function eliminarProducto(id) {
        Swal.fire({
            title: "Estás seguro?",
            text: "Tu producto será eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let carritoAuxiliar = [...carrito].filter(el => el.id !== id);

                setCarrito(carritoAuxiliar);

                Swal.fire({
                    title: "Eliminado",
                    text: "Tu producto fue removido correctamente del carrito",
                    icon: "success"
                });
            }
        });
    }

    return (
        <AppContext.Provider value={{ carrito, agregarAlCarrito, cargarProductos, productos, crearOrden, mostrarCarrito, modalCarrito, eliminarProducto }}>
            {props.children}
        </AppContext.Provider>
    );
};