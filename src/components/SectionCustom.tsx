import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";


const SectionCustom = ()=>{

    const {data,error} = useQuery({
        queryKey:['catalogProducts'],
        queryFn:async () => {
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts', {
                params: {
                    _limit: 5,
                }
            });

            return response;
        }
    })

    return(
        <section className="sectionCustom">
            <div className="container">
                <div className="sectionCustom__inner">
                    <div className="sectionCustom__firstBlock">
                        <h1 className="sectionCustom__firstBlock-title">Custom Builds</h1>
                        <Link to="/catalog" className="sectionCustom__firstBlock-link">See All Products</Link>
                    </div>
                    <div className="sectionCustom__products">

                        {error && <h3>{error.message}</h3>}

                        {data?.data.length ? data?.data.map(product => 
                            <ProductItem key={product.id} product={product}/>)
                            : ''
                        }


                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionCustom;