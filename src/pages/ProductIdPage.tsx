import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/types";
import SectionOutplay from "../components/SectionOutplay";
import SectionFeatures from "../components/SectionFeatures";

const ProductIdPage = () => {

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    const [tab, setTab] = useState('aboutProduct');

    const [inputValue,setInputValue] = useState<number>(1);


    
    const {data} = useQuery({
        queryKey:['productPageId'],
        queryFn:async () => {
            // делаем запрос на сервер по конкретному id,который достали из url
            const response = await axios.get<IProduct>(`http://localhost:5000/catalogProducts/${params.id}`);
            
            return response;
        }
    })

    const [priceProduct,setPriceProduct] = useState(data?.data.price);

    

    const changeInputValue=(e:ChangeEvent<HTMLInputElement>)=>{
        // изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число
        if(+e.target.value > 99){
            setInputValue(99);

        }else if(+e.target.value <= 0){
            setInputValue(0);

        }else{
            setInputValue(+e.target.value);
        }
    }

    const handlerBtnPlus=()=>{
        if(inputValue < 99 && inputValue >= 0){
            setInputValue((prev)=>prev + 1);
        }else{
            setInputValue(99);
        }
    }

    const handlerBtnMinus=()=>{
        if(inputValue > 1){
            setInputValue((prev)=>prev - 1);
        }else{
            setInputValue(1);
        }
    }

    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(()=>{
        // если data?.data.price true(то есть она есть),то меняем значение priceProduct
        if(data?.data.price){
            setPriceProduct(data?.data.price * inputValue);    
        }

    },[inputValue,data?.data])
    
    return (
        <>
            <section className="sectionProductPageTop">
                <div className="container">
                    <div className="sectionProductPageTop__inner">
                        <div className="sectionProductPageTop__top">
                            <div className="sectionProductPageTop__top-tabs">
                                <button className={tab === 'aboutProduct' ? 'top__tabs-btn top__tabs-btn--active' : 'top__tabs-btn'} onClick={()=>setTab('aboutProduct')}>About Product</button>
                                <button className={tab === 'comments' ? 'top__tabs-btn top__tabs-btn--active' : 'top__tabs-btn'} onClick={()=>setTab('comments')}>Comments</button>
                            </div>
                        </div>
                        <div className="sectionProductPageTop__main">
                            {tab === 'aboutProduct' &&
                                <div className="sectionProductPageTop__main-leftBlock">
                                    <h2 className="main__leftBlock-subtitle">Home {'>'} Catalog {'>'} {data?.data.category}</h2>
                                    <h1 className="main__leftBlock-title">{data?.data.name}</h1>
                                    <p className="main__leftBlock-desc">MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop</p>
                                    <div className="main__leftBlock-cartBlock">
                                        <div className="leftBlock__cartBlock-priceAndInput">
                                            <p className="leftBlock__cartBlock-price">${priceProduct}</p>
                                            <div className="leftBlock__cartBlock-inputBlock">
                                                <button className="cartBlock__inputBlock-btnUp" onClick={handlerBtnPlus}>
                                                    <img src="/images/sectionProductPageTop/Frame 98.png" alt="" className="cartBlock__inputBlock-imgUp" />
                                                </button>
                                                <button className="cartBlock__inputBlock-btnDown" onClick={handlerBtnMinus}>
                                                    <img src="/images/sectionProductPageTop/Frame 97.png" alt="" className="cartBlock__inputBlock-imgDown" />
                                                </button>

                                                {/* изменяем состояние инпута цены на текущее значение инпута,указываем + перед e.target.value,чтобы перевести текущее значение инпута из строки в число */}
                                                <input type="number" className="cartBlock__inputBlock-input" max="100" min="1" value={inputValue} onChange={changeInputValue}/>

                                            </div>
                                        </div>
                                        <button className="leftBlock__cartBlock-cartBtn">Add to Cart</button>
                                    </div>
                                </div>
                            }


                            {tab === 'comments' && 
                                <div className="sectionProductPageTop__main-leftBlockComments">
                                    <h3>Comments</h3>
                                </div>
                            }
                            

                            <div className="sectionProductPageTop__main-rightBlock">
                                <img src={data?.data.image} alt="" className="main__rightBlock-img" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <SectionOutplay/>
            <SectionFeatures/>
        </>
    )
}

export default ProductIdPage;