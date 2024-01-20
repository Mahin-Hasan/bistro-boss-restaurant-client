import { FaBeer, FaCalendar, FaHome, FaInfo, FaSave, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const DashBoard = () => {
    const [cart] = useCart();

    return (

        <div className='max-w-screen-xl mx-auto'>
            <div className="flex">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu">
                        <li>
                            <NavLink to="/dashboard/userHome"><FaHome /> User Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/cart"><FaShoppingCart /> My Cart ({cart.length})</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/reservation"><FaCalendar /> Reservation</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/review"><FaInfo /> Add a Review</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/bookings"><FaSave /> My Bookings</NavLink>
                        </li>
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/"><FaHome /> Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu"><FaBeer /> Menu</NavLink>
                        </li>
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;