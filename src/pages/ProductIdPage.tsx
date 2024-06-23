import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../types/types";
import SectionOutplay from "../components/SectionOutplay";
import SectionFeatures from "../components/SectionFeatures";

const ProductIdPage = () => {

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    const [tab, setTab] = useState('aboutProduct');

    const [inputValue, setInputValue] = useState<number>(1);

    const [activeForm, setActiveForm] = useState(false);

    const [activeStars, setActiveStars] = useState(1);

    const [inputFormName,setInputFormName] = useState('');

    const [inputFormArea,setInputFormArea] = useState('');

    const [formErrorMessage,setFormErrorMessage]=useState(false);

    const { data } = useQuery({
        queryKey: ['productPageId'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url
            const response = await axios.get<IProduct>(`http://localhost:5000/catalogProducts/${params.id}`);

            return response;
        }
    })

    const [priceProduct, setPriceProduct] = useState(data?.data.price);



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

    const formHandler = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // если значение textarea и input (.trim()-убирает из строки пробелы,чтобы нельзя было ввести только пробел) в форме комментария будет пустой строчкой(то есть пользователь ничего туда не ввел),будем изменять состояние formErrorMessage(то есть показывать ошибку и не отправлять комментарий),в другом случае очищаем поля textarea и input формы и убираем форму
        if(inputFormArea.trim() === '' || inputFormName.trim() === ''){
            setFormErrorMessage(true);
        }else{
            setActiveForm(false);
            setFormErrorMessage(false);
            setInputFormArea('');
            setInputFormName('');
            setActiveStars(1);
        }

    }

    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(() => {
        // если data?.data.price true(то есть она есть),то меняем значение priceProduct
        if (data?.data.price) {
            setPriceProduct(data?.data.price * inputValue);
        }

    }, [inputValue, data?.data])

    return (
        <>
            <section className="sectionProductPageTop">
                <div className="container">
                    <div className="sectionProductPageTop__inner">
                        <div className="sectionProductPageTop__top">
                            <div className="sectionProductPageTop__top-tabs">
                                <button className={tab === 'aboutProduct' ? 'top__tabs-btn top__tabs-btn--active' : 'top__tabs-btn'} onClick={() => setTab('aboutProduct')}>About Product</button>
                                <button className={tab === 'comments' ? 'top__tabs-btn top__tabs-btn--active' : 'top__tabs-btn'} onClick={() => setTab('comments')}>Comments</button>
                            </div>
                        </div>
                        <div className={tab === 'comments' ? "sectionProductPageTop__main sectionProductPageTop__main-comments" : "sectionProductPageTop__main"}>
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
                                                <input type="number" className="cartBlock__inputBlock-input" max="100" min="1" value={inputValue} onChange={changeInputValue} />

                                            </div>
                                        </div>
                                        <button className="leftBlock__cartBlock-cartBtn">Add to Cart</button>
                                    </div>
                                </div>
                            }


                            {tab === 'comments' &&
                                <div className="sectionProductPageTop__main-leftBlockComments">
                                    <div className="leftBlockComments__topline">
                                        <h3 className="leftBlockComments__title">No comments yet.</h3>
                                        <button className={activeForm ? "leftBlockComments__topline-btn leftBlockComments__topline-btnNone" : "leftBlockComments__topline-btn"} onClick={() => setActiveForm(true)}>Add Comment</button>
                                    </div>
                                    <form className={activeForm ? "leftBlockComments__form" : "leftBlockComments__form leftBlockComments__form-passive"}>
                                        <div className="leftBlockComments__form-top">
                                            <input type="text" placeholder="Name" className="form__top-input" value={inputFormName} onChange={(e)=>setInputFormName(e.target.value)}/>
                                            <div className="form__top-ratingBlock">
                                                <div className="mark__stars5 mark__starsHover" onClick={()=>setActiveStars(1)}>
                                                    <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={()=>setActiveStars(2)}>
                                                    <img src={activeStars === 2 || activeStars === 3 || activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={()=>setActiveStars(3)}>
                                                    <img src={activeStars === 3 || activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={()=>setActiveStars(4)}>
                                                    <img src={activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={()=>setActiveStars(5)}>
                                                    <img src={activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form__main">
                                            <textarea className="form__main-textarea" placeholder="Enter your comment" value={inputFormArea} onChange={(e)=>setInputFormArea(e.target.value)}></textarea>
                                        </div>
                                        {formErrorMessage && <p className="form__errorText">Fill out all form fields and rating</p>}
                                        <button className="form__btn" onClick={formHandler}>Save Comment</button>
                                    </form>

                                </div>
                            }


                            <div className="sectionProductPageTop__main-rightBlock">
                                <img src={data?.data.image} alt="" className="main__rightBlock-img" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <SectionOutplay />
            <SectionFeatures />
        </>
    )
}

export default ProductIdPage;