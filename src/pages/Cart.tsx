import { useContext, useEffect, useState } from "react";
import ProductItemBasket from "../components/ProductItemBasket";
import { apiBasket } from "../store/apiBasket";
import { IProduct } from "../types/types";
import { BasketContext } from "../App";

const Cart = () => {

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    const [deleteProductsBasket] = apiBasket.useDeleteAllProductsBasketMutation();

    const [totalCheck,setTotalCheck] = useState<number>();

    // const {inputValue,priceValue,product} = useContext(BasketContext); // берем из нашего BasketContext состояния

    // const [updateProductBasket] = apiBasket.useUpdateProductBasketMutation();

    const dataCheck = data?.reduce((prev,curr) => prev + curr.totalPrice,0); // проходимся по массиву объектов корзины и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).totalPrice,это чтобы посчитать общую сумму цены всех товаров


    // const updateBasketProducts = ()=>{

    //     // updateProductBasket({...product,amount:inputValue,totalPrice:priceValue}); // обновляем данные у товара корзины на состояние из нашего BasketContext(мы передали в ProductItemBasket данные цены и тд в функцию нашего BasketContext,которая меняет состояния inputValue,priceValue,product в BasketContext,и на эти данные уже обновляем товар корзины)
    //     // console.log('updated')

    // }

    // функция для удаления всех товаров корзины
    const deleteAllProducts=()=>{
        // проходимся по каждому элементу массива товаров корзины и вызываем мутацию deleteProductsBasket и передаем туда product.id(id каждого товара на каждой итерации)
        data?.forEach(product =>{ 
            deleteProductsBasket(product.id);
        });

    }


    useEffect(()=>{
        setTotalCheck(dataCheck);
    },[data])

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
                            <div className="sectionCart__table-bottom">
                                <div className="table__bottom-btns">
                                    {/* <button className="sectionCart__table-btn" onClick={updateBasketProducts}>Update Shopping Cart</button> */}
                                    <button className="sectionCart__table-btn" onClick={deleteAllProducts}>Clear Shopping Cart</button>
                                </div>
                                <p className="table__bottom-text">Total: ${totalCheck}</p>
                            </div>
                        </div>
                        : <h3>Cart is Empty</h3>

                    }

                </div>
            </div>
        </section>
    )
}

export default Cart;