import featuredImg from '../../../assets/home/featured.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Featured.css'
const Featured = () => {
    return (
        <section className='featured-item text-white pt-8 my-20'>
            <SectionTitle
                subHeading="Check It Out"
                heading="Featured Item"
            ></SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2024</p>
                    <p className='uppercase'>Where can I get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae labore atque dicta laborum ipsa fugiat architecto molestiae. Ipsum itaque voluptatem sint, sit nesciunt corporis enim! Laborum itaque earum placeat dolorem?</p>
                    <button className='btn btn-outline'>Order Now</button>
                </div>
            </div>

        </section>
    );
};

export default Featured;