import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IComment, IProduct } from "../types/types";
import SectionOutplay from "../components/SectionOutplay";
import SectionFeatures from "../components/SectionFeatures";
import { apiBasket } from "../store/apiBasket";

const ProductIdPage = () => {

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    const [tab, setTab] = useState('aboutProduct');

    const [inputValue, setInputValue] = useState<number>(1);

    const [activeForm, setActiveForm] = useState(false);

    const [activeStars, setActiveStars] = useState(1);

    const [inputFormName, setInputFormName] = useState('');

    const [inputFormArea, setInputFormArea] = useState('');

    const [formErrorMessage, setFormErrorMessage] = useState(false);

    const [formErrorName, setFormErrorName] = useState(false);

    const [commForName, setCommForName] = useState<IComment[] | undefined>([])

    const [commentsForName, setCommentsForName] = useState<IComment[] | undefined>([]);

    const [commentsRatingMain, setCommentsRatingMain] = useState(0);

    const [addProductBasket] = apiBasket.useAddProductBasketMutation(); // берем функцию запроса на сервер из нашего api(apiBasket) с помощью нашего хука useAddProductBasketMutation,вторым элементом,который можно взять у этого хука,это все состояния,которые rtk query автоматически создает,а также data(данные запроса)

    const { data: dataBasket } = apiBasket.useGetAllProductsBasketQuery(null); // делаем запрос на сервер для получения всех объектов в корзине,чтобы сделать проверку на существующий товар в корзине,указываем в параметре useGetAllProductsBasketQuery null,так как используем typescript



    const { data, refetch } = useQuery({
        queryKey: ['productPageId'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url
            const response = await axios.get<IProduct>(`http://localhost:5000/catalogProducts/${params.id}`);

            return response;
        }
    })

    const isExistsBasket = dataBasket?.some(p => p.name === data?.data.name);  // делаем проверку методом some и результат записываем в переменную isExistsBasket,если в dataBasket(в массиве объектов корзины) есть элемент name которого равен data?.data name(то есть name этого товара)

    const [priceProduct, setPriceProduct] = useState(data?.data.price);

    const { data: dataComments, refetch: refetchComments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url
            const response = await axios.get<IComment[]>('http://localhost:5000/comments');

            return response;
        }
    })

    // функция для post запроса на сервер с помощью useMutation(react query),создаем комментарий на сервере,берем mutate у useMutation,чтобы потом вызвать эту функцию запроса на сервер в нужный момент
    const { mutate } = useMutation({
        mutationKey: ['create comment'],
        mutationFn: async (comment: IComment) => {
            // делаем запрос на сервер и добавляем данные на сервер,в квадратных скобках указываем конкретные данные,которые нужно создать или обновить на сервере,указываем тип данных,которые приходят(в данном случае указали any),а также тип самих данных,которые нужно добавить на сервер(в данном случае IComment),но здесь не обязательно указывать тип,делаем тип объекта,который мы передаем на сервер as IComment(id вручную не указываем,чтобы он сам генерировался автоматически на сервере)
            await axios.post<IComment>('http://localhost:5000/comments', comment);
        },
        // при успешной мутации переобновляем массив комментариев
        onSuccess() {
            refetchComments();
        }
    })

    const { mutate: mutateRating } = useMutation({
        mutationKey: ['update ratingProduct'],
        mutationFn: async (product: IProduct) => {
            await axios.put<any, any, IProduct>(`http://localhost:5000/catalogProducts/${params.id}`, product);

        },
        onSuccess() {
            refetch();
        }
    })



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

    // при изменении массива комментариев и массива data?.data(самого товара) переобновляем массив комментарие,фильтруем его и помещаем в состояние(чтобы комментарии показывались для каждого товара отдельные)
    useEffect(() => {
        refetch();
        refetchComments();

        const dataCommentsForName = dataComments?.data.filter(c => c.nameFor === data?.data.name); // массив данных комментариев фильтруем для каджого товара по его имени

        setCommentsForName(dataCommentsForName);

        const commentsRating = dataCommentsForName?.reduce((prev, curr) => prev + curr.rating, 0); // проходимся по массиву объектов комментариев,отфильтрованных для каждого товара по имени и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).rating ,это чтобы посчитать общую сумму всего рейтинга от каждого комментария и потом вывести среднее значение

        // если commentsRating true(эта переменная есть и равна чему-то) и dataCommentsForName?.length true(этот массив отфильтрованных комментариев есть),то считаем средний рейтинг всех комментариев и записываем его в переменную,а потом в состояние,чтобы отобразить рейтинг
        if (dataCommentsForName?.length && commentsRating) {
            const commentsRatingMiddle = commentsRating / dataCommentsForName?.length; // считаем средний рейтинг комментариев для каждого товара,делим общее количество рейтинга каждого комменатрия на количество комментариев для каждого товара

            setCommentsRatingMain(commentsRatingMiddle);

        } else {
            setCommentsRatingMain(0); // если комментариев нет у этого товара,то меняем состояние рейтинга на 0

        }

        const commentsForName = dataComments?.data.filter(c => c.nameFor === data?.data.name).filter(comm => comm.name === inputFormName); // у каждого комментария если nameFor равно name у товара этой страницы,то оставить в массиве commentsForName,и у нового отфильтрованного массива проверяем some (возвращает true или false при срабатывании условия) ,если name у комментария нового массива равно inputFormName,то оставить в массиве (то есть если пользователь ввел такое же имя,как и у существующего комментария иммено у этого товара,чтобы потом показывалось сообщение,что такое имя уже есть)

        setCommForName(commentsForName);


    }, [dataComments?.data, data?.data])


    const formHandler = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const commentsForName = dataComments?.data.filter(c => c.nameFor === data?.data.name).filter(comm => comm.name === inputFormName); // у каждого комментария если nameFor равно name у товара этой страницы,то оставить в массиве commentsForName,и у нового отфильтрованного массива проверяем some (возвращает true или false при срабатывании условия) ,если name у комментария нового массива равно inputFormName,то оставить в массиве (то есть если пользователь ввел такое же имя,как и у существующего комментария иммено у этого товара,чтобы потом показывалось сообщение,что такое имя уже есть)

        // если значение textarea и input (.trim()-убирает из строки пробелы,чтобы нельзя было ввести только пробел) в форме комментария будет пустой строчкой(то есть пользователь ничего туда не ввел),будем изменять состояние formErrorMessage(то есть показывать ошибку и не отправлять комментарий),в другом случае очищаем поля textarea и input формы и убираем форму
        if (inputFormArea.trim() === '' || inputFormName.trim() === '') {
            setFormErrorMessage(true);
        } else if (commentsForName?.length || commForName?.length) {
            // если длина массива комментариев,отфильтрованного по условию в переменной commentsForName true(то есть такие комментарии есть) или если состояние commForName?.lentgh true(то есть такие комментарии есть),то показываем ошибку
            setFormErrorName(true);
        } else {

            mutate({ name: inputFormName, nameFor: data?.data.name, text: inputFormArea, rating: activeStars, } as IComment); // вызываем функцию post запроса на сервер,создавая комментарий,разворачивая в объект нужные поля для комментария и давая этому объекту тип as IComment(вручную не указываем id,чтобы он автоматически создавался на сервере)

            // refetchComments()

            // делаем запрос на сервер с помощью useMutation и изменяем поле rating на commentsRatingMain,остальные поля объекта data даем значения такие,какие и были,кроме id,его не указываем, и ставим тип объекта as IProduct
            // mutateRating({ amount: data?.data.amount, category: data?.data.category, image: data?.data.image, name: data?.data.name, price: data?.data.price, priceFilter: data?.data.priceFilter, totalPrice: data?.data.totalPrice, rating: commentsRatingMain } as IProduct);


            const dataCommentsForName = dataComments?.data.filter(c => c.nameFor === data?.data.name); // массив данных комментариев фильтруем для каджого товара по его имени

            const commentsRating = dataCommentsForName?.reduce((prev, curr) => prev + curr.rating, 0); // проходимся по массиву объектов комментариев,отфильтрованных для каждого товара по имени и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).rating ,это чтобы посчитать общую сумму всего рейтинга от каждого комментария и потом вывести среднее значение


            //если commentsRating true(эта переменная есть и равна чему-то) и dataCommentsForName?.length true(этот массив отфильтрованных комментариев есть),то считаем средний рейтинг всех комментариев и записываем его в переменную,а потом в состояние,чтобы отобразить рейтинг
            if (dataCommentsForName?.length && commentsRating) {
                const commentsRatingMiddle = commentsRating / dataCommentsForName?.length; // считаем средний рейтинг комментариев для каждого товара,делим общее количество рейтинга каждого комменатрия на количество комментариев для каждого товара

                setCommentsRatingMain(commentsRatingMiddle);

                mutateRating({ amount: data?.data.amount, category: data?.data.category, image: data?.data.image, name: data?.data.name, price: data?.data.price, priceFilter: data?.data.priceFilter, totalPrice: data?.data.totalPrice, rating: commentsRatingMiddle } as IProduct);

            } else {
                mutateRating({ amount: data?.data.amount, category: data?.data.category, image: data?.data.image, name: data?.data.name, price: data?.data.price, priceFilter: data?.data.priceFilter, totalPrice: data?.data.totalPrice, rating: 0 } as IProduct);

            }


            setActiveForm(false);
            setFormErrorMessage(false);
            setInputFormArea('');
            setInputFormName('');
            setActiveStars(1);
            setFormErrorName(false);
        }

    }


    // при изменении inputValue и data?.data(в данном случае данные товара,полученные с сервера,чтобы при запуске страницы сайта уже было значение в priceProduct,без этого стартовое значение priceProduct не становится на data?.data.price) изменяем состояние priceProduct
    useEffect(() => {
        // если data?.data.price true(то есть она есть),то меняем значение priceProduct
        if (data?.data.price) {
            setPriceProduct(data?.data.price * inputValue);
        }

    }, [inputValue, data?.data])

    const addToCart = async () => {
        await addProductBasket({ name: data?.data.name, category: data?.data.category, image: data?.data.image, price: data?.data.price, rating: data?.data.rating, priceFilter: data?.data.priceFilter, amount: inputValue, totalPrice: priceProduct } as IProduct); // передаем в addProductBasket объект типа IProduct только таким образом,разворачивая в объект все необходимые поля(то есть наш product,в котором полe name,делаем поле name со значением,как и у этого name и остальные поля также,кроме поля amount и totalPrice,их мы изменяем и указываем как значения inputValue(инпут с количеством) и priceProduct(состояние цены,которое изменяется при изменении inputValue)),указываем тип этого объекта, созданный нами тип IProduct,при создании на сервере не указываем конкретное значение id,чтобы он сам автоматически генерировался на сервере и потом можно было удалить этот объект

    }


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
                                    <div className="main__leftBlock-rating">
                                        <div className="mark__stars5 " >
                                            <img src={commentsRatingMain >= 1 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                        </div>
                                        <div className="mark__stars5" >
                                            <img src={commentsRatingMain >= 2 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                        </div>
                                        <div className="mark__stars5" >
                                            <img src={commentsRatingMain >= 3 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                        </div>
                                        <div className="mark__stars5" >
                                            <img src={commentsRatingMain >= 4 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                        </div>
                                        <div className="mark__stars5" >
                                            <img src={commentsRatingMain >= 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                        </div>

                                    </div>
                                    <h1 className="main__leftBlock-title">{data?.data.name}</h1>
                                    <p className="main__leftBlock-desc">MSI MPG Trident 3 10SC-005AU Intel i7 10700F, 2060 SUPER, 16GB RAM, 512GB SSD, 2TB HDD, Windows 10 Home, Gaming Keyboard and Mouse 3 Years Warranty Gaming Desktop</p>

                                    {isExistsBasket ?
                                        <h3>Already in Cart</h3>
                                        :
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
                                            <button className="leftBlock__cartBlock-cartBtn" onClick={addToCart}>Add to Cart</button>

                                        </div>
                                    }


                                </div>
                            }


                            {tab === 'comments' &&
                                <div className="sectionProductPageTop__main-leftBlockComments">

                                    {commentsForName?.length ?
                                        commentsForName.map((comm) =>
                                            <div className="leftBlockComments__top" key={comm.id}>
                                                <div className="leftBlockComments__top-topline">
                                                    <h2 className="leftBlockComments__top-title">{comm.name}</h2>
                                                    <div className="form__top-ratingBlock">
                                                        <div className="mark__stars5 " >
                                                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                        </div>
                                                        <div className="mark__stars5" >
                                                            <img src={comm.rating === 2 || comm.rating === 3 || comm.rating === 4 || comm.rating === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                        </div>
                                                        <div className="mark__stars5" >
                                                            <img src={comm.rating === 3 || comm.rating === 4 || comm.rating === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                        </div>
                                                        <div className="mark__stars5" >
                                                            <img src={comm.rating === 4 || comm.rating === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                        </div>
                                                        <div className="mark__stars5" >
                                                            <img src={comm.rating === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="leftBlockComments__text">{comm.text}</p>
                                            </div>
                                        )
                                        :
                                        <div className="leftBlockComments__topline">
                                            <h3 className="leftBlockComments__title">No comments yet.</h3>
                                            <button className={activeForm ? "leftBlockComments__topline-btn leftBlockComments__topline-btnNone" : "leftBlockComments__topline-btn"} onClick={() => setActiveForm(true)}>Add Comment</button>
                                        </div>
                                    }

                                    <button className={activeForm || !commentsForName?.length ? "leftBlockComments__topline-btn leftBlockComments__topline-btnNone" : "leftBlockComments__topline-btn leftBlockComments__topline-btnComm"} onClick={() => setActiveForm(true)}>Add Comment</button>

                                    <form className={activeForm ? "leftBlockComments__form" : "leftBlockComments__form leftBlockComments__form-passive"}>
                                        <div className="leftBlockComments__form-top">
                                            <input type="text" placeholder="Name" className="form__top-input" value={inputFormName} onChange={(e) => setInputFormName(e.target.value)} />
                                            <div className="form__top-ratingBlock">
                                                <div className="mark__stars5 mark__starsHover" onClick={() => setActiveStars(1)}>
                                                    <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={() => setActiveStars(2)}>
                                                    <img src={activeStars === 2 || activeStars === 3 || activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={() => setActiveStars(3)}>
                                                    <img src={activeStars === 3 || activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={() => setActiveStars(4)}>
                                                    <img src={activeStars === 4 || activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                                <div className="mark__stars5 mark__starsHover" onClick={() => setActiveStars(5)}>
                                                    <img src={activeStars === 5 ? "/images/sectionCustom/Star 6.png" : "/images/sectionCustom/Star 10.png"} alt="" className="mark__stars5-img mark__stars5-imgComments" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form__main">
                                            <textarea className="form__main-textarea" placeholder="Enter your comment" value={inputFormArea} onChange={(e) => setInputFormArea(e.target.value)}></textarea>
                                        </div>

                                        {formErrorMessage && <p className="form__errorText">Fill out all form fields and rating</p>}

                                        {formErrorName && <p className="form__errorText">This name already exists</p>}

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