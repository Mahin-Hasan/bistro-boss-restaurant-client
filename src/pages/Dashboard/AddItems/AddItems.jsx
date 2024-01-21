import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


// img bb api key
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
console.log(image_hosting_key, image_hosting_api);
const AddItems = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic(); //for imgbb
    const axiosSecure = useAxiosSecure();// for add operation specific to admin
    // const onSubmit = async (data) => {
    //     console.log(data)
    //     // image upload to imgbb and then get an url
    //     const imageFile = { image: data.image[0] }
    //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     });
    //     if (res.data.success) {
    //         // now send the menu item data to the server with the image url
    //         const menuItem = {
    //             name: data.name,
    //             category: data.category,
    //             price: parseFloat(data.price),
    //             recipe: data.recipe,
    //             image: res.data.data.display_url
    //         }
    //         // 
    //         const menuRes = await axiosSecure.post('/menu', menuItem);
    //         console.log(menuRes.data)
    //         if(menuRes.data.insertedId){
    //             // show success popup
    //             reset();
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: `${data.name} is added to the menu.`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
    //         }
    //     }
    //     console.log( 'with image url', res.data);
    // };
    const onSubmit = async (data) => {
        console.log(data)
        console.log(data.image[0])
        //image upload to imgbb and then get the url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            //now send the data to the server with the image url
            // const staticUrl ='https://img.freepik.com/free-photo/tasty-burger-isolated-white-background-fresh-hamburger-fastfood-with-beef-cheese_90220-1063.jpg?size=338&ext=jpg&ga=GA1.1.632798143.1705795200&semt=sph';
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
                // image: res.data.data.display_url
            }
            //
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                // show popup sucess
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="what's new?"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register("name", { required: true })}
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            {/* <label>First Name</label> */}
                            {/* <input {...register("name")} /> */}
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register("category", { required: true })}
                                className="select select-bordered w-full">
                                {/* must use value default to ignore browser error */}
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register("price", { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea {...register("recipe", { required: true })}
                            className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>
                    {/* File input */}
                    <div className="form-control w-full my-6">
                        <input {...register("image", { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                    </div>
                    <button className="btn btn-neutral">
                        Add Item <FaUtensils className="ml3" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;