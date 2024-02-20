import { createContext, useContext, useState } from "react";

import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

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
// const queryRef = query(collectionRef, where("price", "<", 10000));   Para realizar filtros eventualmente.

const orderCollection = collection(db, "orders");

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const ContextProvider = (props) => {

    const [carrito, setCarrito] = useState([]);

    const [productos, setProductos] = useState([]);
    // const [profesores, setProfesores] = useState([]);

    function agregarAlCarrito(producto) {
        console.log("Vas a agregar el producto: ", producto)
        let carritoAuxiliar = [...carrito];
        carritoAuxiliar.push(producto);
        setCarrito(carritoAuxiliar);

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

    function crearOrden(){

        if(carrito.length > 0){

            
            const nuevaOrden = {
            nombre: "Lucas",
            telefono: 1234,
            mail: "lucas@coder.com",
            productos: carrito,
        };

        // Crear nuestro documento en la coleción ORDERS

        addDoc(orderCollection, nuevaOrden).then(response => {
            console.log(response);
            console.log("------------------")
            console.log("Se creó la orden con el id: ", response.id);
        })
        .catch(err => console.log(err));

        // Limpiar carrito

        setCarrito([]);
        console.log("Tu orden es: ", nuevaOrden);
        } else {
            alert("No podés crear una orden vacía.")
        }
    };

    return (
        <AppContext.Provider value={{ carrito, agregarAlCarrito, cargarProductos, productos, crearOrden }}>
            {props.children}
        </AppContext.Provider>
    );
};