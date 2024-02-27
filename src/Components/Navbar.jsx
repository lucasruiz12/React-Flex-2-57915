import { Link } from "react-router-dom"
import CartWidget from "./CartWidget"
import { useAppContext } from "../context/Context"
import ModalCarrito from "./ModalCarrito";

const Navbar = () => {

    const { carrito, mostrarCarrito, modalCarrito } = useAppContext();

    return (
        <>
            {modalCarrito && <ModalCarrito />}
            <div className="navbar">
                <Link to='/'><h4>Home</h4></Link>
                <Link to='/contact'><h4>Contact</h4></Link>
                <div className="cart-icon" style={{ display: "flex" }} onClick={() => mostrarCarrito()}>
                    <CartWidget />
                    {
                        carrito.length > 0 &&
                        <p>{carrito.length}</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar