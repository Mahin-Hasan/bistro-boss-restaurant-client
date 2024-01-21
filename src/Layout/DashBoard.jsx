import { FaBeer, FaBook, FaCalendar, FaEnvelope, FaHome, FaInfo, FaList, FaSave, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
    const [cart] = useCart();


    //TODO: get isAdmin value from the databse
    // const isAdmin = true; //prev static  
    const [isAdmin] = useAdmin(); //sending as array in useAdmin to destructuring as [isAdmin]
    return (

        <div className='max-w-screen-xl mx-auto'>
            <div className="flex">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen bg-orange-400">
                    <ul className="menu">
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink to="/dashboard/adminHome"><FaHome /> Admin Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/addItems"><FaUtensils /> Add Items</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/manageItems"><FaList /> Manage Items</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/bookings"><FaBook /> Manage Bookings</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/users"><FaUsers /> All Users</NavLink>
                                    </li>
                                </>
                                :
                                <>
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
                                    </li></>
                        }
                        {/* shared nav links */}
                        <div className="divider"></div>
                        <li>
                            <NavLink to="/"><FaHome /> Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/menu"><FaBeer /> Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact"><FaEnvelope /> Contact</NavLink>
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