import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const FoodCard = ({ item }) => {
    const { _id, name, image, price, recipe } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    //advanced way for api calls
    const axiosSecure = useAxiosSecure();

    const handleAddToCart = food => {
        console.log(food);
        if (user && user.email) {
            //send cart to database || making it conditional because forcing user to login
            //add to cart functionality be careful with item id storing

            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            }
            console.log(cartItem);
            //use axios secure
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
            //we will skip this traditional way
            // axios.post('http://localhost:5000/carts', cartItem)
            //     .then(res => {
            //         console.log(res.data)
            //         if (res.data.insertedId) {
            //             Swal.fire({
            //                 position: "top-end",
            //                 icon: "success",
            //                 title: `${name} added to your cart`,
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             });
            //         }
            //     })
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add item to cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //send the user to the login page
                    navigate('/login', { state: { from: location } })// be careful while using this
                }
            });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-t p-4 bg-stone-900 text-white font-bold">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className='btn btn-outline border-0 border-b-4 mt-4'>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;