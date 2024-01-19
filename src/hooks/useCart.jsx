import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useCart = () => {
    //we should use tan stack query to resolve issues and handle errors in optimized way || and use refetch for cart data
    const axiosSecure = useAxiosSecure();
    //using use Auth so solve a reaload car number issue
    const { user } = useAuth();
    const { refetch, data: cart = [] } = useQuery({ //in this line cart is set as an aleas name and set default value
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`) // be careful using query
            return res.data; //bz axios gives data.data
        }
    })
    return [cart, refetch]
};

export default useCart;