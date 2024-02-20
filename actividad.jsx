/*

PARTE 1

---------

1. Crear proyecto con el nombre correspondiente.
2. Una vez creado, dar en continuar. Luego, abrir el proyecto desde WEB </> y ponerle nombre. Registrar app.
3. Crear nueva base de datos como está, en modo prueba y modificarle las reglas después con las fechas para poder tener control del tiempo y que dure más de 30 días.


PARTE 2

------------

1. Copiar todo lo que tenemos
2. getFirestore de firebase/firestore importarlo y después const db = getFirestore(app)
3. Mostrar cómo hacer una petición y lo vamos a hacer directamente con getDocs y todo el tema de la lógica para que se vea más prolijo. Lo llevamos por ejemplo al context y de ahí lo ejecutamos en ItemListContainer


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, "items");
const q = query(collectionRef, where("nombre", "!=", "Producto 1"))

    function verProductos(){
        getDocs(collectionRef).then((snapshot) => {
            snapshot.forEach(el => {
                console.log(el.data())
            })
        });
    }
    
    
Para filtros podría cambiar collectionRef por q, no olvidarse de importar where, query y demás todo de firebase firestore

4. Ir a modificar el carrito widget que por ahora solamente va a ser un botón para finalizar compra pero lo ideal sería poder mostrar los productos y elegir qué hacer con ello. Le ponemos un console y después sabemos que ahí es donde haríamos la función de comprar, setear carrito en [], crear una nueva orden con el usuario, contacto y los productos

const orderCollection = collection(db, "orders");

const crearOrden = () => {
	const nuevaOrden = {
		nombre: "Lucas",
		telefono: 1234,
		mail: "lucas@coder.com",
		productos: carrito
	};
	
	
	setCarrito([]);
	
	addDoc(orderCollection, nuevaOrden).then(response => console.log(`Orden creada con el id ${response.idl}`)
};


*/