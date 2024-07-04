import { ChangeEvent, useContext, useEffect, useState } from "react";
import { IProduct } from "../types/types";
import { apiBasket } from "../store/apiBasket";
import { BasketContext } from "../App";
import { setTimeout } from "timers/promises";


interface IProductBasket {
    product: IProduct
}

const ProductItemBasket = ({ product }: IProductBasket) => {

    const [inputValue, setInputValue] = useState<number>(product.amount);

    const [priceProduct, setPriceProduct] = useState(product.totalPrice);

    const [deleteProductBasket] = apiBasket.useDeleteProductBasketMutation();

    const [updateProductBasket] = apiBasket.useUpdateProductBasketMutation();

    // const {updateBasket} = useContext(BasketContext)


    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        // изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число
        if (+e.target.value > 99) {
            setInputValue(99);

        } else if (+e.target.value <= 0) {
            setInputValue(0);

        } else {
            setInputValue(+e.target.value);
        }
    }

    const handlerBtnPlus = () => {
        if (inputValue < 99 && inputValue >= 0) {
            setInputValue((prev) => prev + 1);
        } else {
            setInputValue(99);
        }
    }

    const handlerBtnMinus = () => {
        if (inputValue > 1) {
            setInputValue((prev) => prev - 1);
        } else {
            setInputValue(1);
        }
    }

    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(() => {

        setPriceProduct(product.price * inputValue);

    }, [inputValue])

    useEffect(() => {

        // updateBasket(inputValue,priceProduct,product);
        // console.log(priceProduct)

        updateProductBasket({ ...product, amount: inputValue, totalPrice: priceProduct }); // обновляем данные товара корзины при изменении priceProduct

    }, [priceProduct])


    return (
        <>
            <div className="table__main-item table__main-itemMobile">
                <img src={product.image} alt="" className="main__item-img" />
                <p className="main__item-text">{product.name}</p>
                <p className="main__item-price">${product.price}</p>
                <div className="leftBlock__cartBlock-inputBlock">
                    <button className="cartBlock__inputBlock-btnUp" onClick={handlerBtnPlus}>
                        <img src="/images/sectionProductPageTop/Frame 98.png" alt="" className="cartBlock__inputBlock-imgUp" />
                    </button>
                    <button className="cartBlock__inputBlock-btnDown" onClick={handlerBtnMinus}>
                        <img src="/images/sectionProductPageTop/Frame 97.png" alt="" className="cartBlock__inputBlock-imgDown" />
                    </button>

                    {/* изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число */}
                    <input type="number" className="cartBlock__inputBlock-input" max="100" min="1" value={inputValue} onChange={changeInputValue} />
                </div>
                <p className="main__item-price">${priceProduct}</p>
                <div className="main__item-btnBlock">
                    <button className="main__item-btn" onClick={() => deleteProductBasket(product)}>
                        <img src="/images/sectionCart/Group 108.png" alt="" className="main__item-btnImg" />
                    </button>
                </div>
            </div>

            <div className="table__mainMobile-item table__main-itemMobileActive">
                <div className="main__item-topBlock">
                    <img src={product.image} alt="" className="main__item-img" />
                    <p className="main__item-text">{product.name}</p>
                </div>
                <div className="main__item-mainBlock">
                    <div className="main__item-priceBlock">
                        <p className="item__priceBlock-text">Price</p>
                        <p className="main__item-price">${product.price}</p>
                    </div>
                    <div className="main__item-AmountBlock">
                        <p className="item__priceBlock-text">Amount</p>
                        <div className="leftBlock__cartBlock-inputBlock">
                            <button className="cartBlock__inputBlock-btnUp" onClick={handlerBtnPlus}>
                                <img src="/images/sectionProductPageTop/Frame 98.png" alt="" className="cartBlock__inputBlock-imgUp" />
                            </button>
                            <button className="cartBlock__inputBlock-btnDown" onClick={handlerBtnMinus}>
                                <img src="/images/sectionProductPageTop/Frame 97.png" alt="" className="cartBlock__inputBlock-imgDown" />
                            </button>

                            {/* изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число */}
                            <input type="number" className="cartBlock__inputBlock-input" max="100" min="1" value={inputValue} onChange={changeInputValue} />
                        </div>
                    </div>
                    <div className="main__item-subtotalBlock">
                        <p className="item__priceBlock-text">Subtotal</p>
                        <p className="main__item-price">${priceProduct}</p>
                    </div>
                    <div className="main__item-btnBlock">
                        <button className="main__item-btn" onClick={() => deleteProductBasket(product)}>
                            <img src="/images/sectionCart/Group 108.png" alt="" className="main__item-btnImg" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItemBasket;