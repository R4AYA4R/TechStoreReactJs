import { IProduct } from "../types/types";

interface IProductProps{
    product:IProduct
}

const ProductItem = ({product}:IProductProps) => {
    return (
        <a href="#" className="products__linkItem">
            <div className="sectionCustom__products-item">
                <div className="products__item-imgBlock">
                    <img src={product.image} alt="" className="products__item-img" />
                </div>
                <div className="products__item-mark">
                    <div className="mark__stars">
                        <div className="mark__stars1">
                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars1-img" />
                        </div>
                        <div className="mark__stars2">
                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars2-img" />
                        </div>
                        <div className="mark__stars3">
                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars3-img" />
                        </div>
                        <div className="mark__stars4">
                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars4-img" />
                        </div>
                        <div className="mark__stars5">
                            <img src="/images/sectionCustom/Star 10.png" alt="" className="mark__stars5-img" />
                        </div>
                    </div>
                    <p className="mark__text">Reviews (4)</p>
                </div>
                <h2 className="products__item-title">{product.name}</h2>
                <p className="products__item-price">${product.price}</p>
            </div>
        </a>
    )
}

export default ProductItem;