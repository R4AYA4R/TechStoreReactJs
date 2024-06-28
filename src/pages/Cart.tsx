import ProductItemBasket from "../components/ProductItemBasket";
import { apiBasket } from "../store/apiBasket";

const Cart = () => {

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    return (
        <section className="sectionCart">
            <div className="container">
                <div className="sectionCart__inner">
                    <h2 className="sectionCart__subtitle">Home {'>'} Cart</h2>
                    <h1 className="sectionCart__title">Shopping Cart</h1>

                    {data?.length ?
                        <div className="sectionCart__table">
                            <ul className="sectionCart__table-topList">
                                <li className="table__topList-item">
                                    <p className="topList__item-text">Item</p>
                                </li>
                                <li className="table__topList-item">
                                    <p className="topList__item-text">Price</p>
                                </li>
                                <li className="table__topList-item">
                                    <p className="topList__item-text">Amount</p>
                                </li>
                                <li className="table__topList-item">
                                    <p className="topList__item-text">Subtotal</p>
                                </li>
                            </ul>
                            <div className="sectionCart__table-main">

                                {data.map(product =>
                                    <ProductItemBasket key={product.id} product={product} />
                                )}

                            </div>
                            <button className="sectionCart__table-btn">Update Shopping Cart</button>
                        </div>
                        : <h3>Cart is Empty</h3>

                    }

                </div>
            </div>
        </section>
    )
}

export default Cart;