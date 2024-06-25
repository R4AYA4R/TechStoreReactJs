import { useNavigate } from "react-router-dom";
import { IComment, IProduct } from "../types/types";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface IProductProps {
    product: IProduct
}

const ProductItem = ({ product }: IProductProps) => {

    const router = useNavigate(); // useNavigate может перемещатьтся на другую страницу вместо ссылок

    const [commentsRatingMain, setCommentsRatingMain] = useState(0);

    const { data: dataComments, refetch: refetchComments } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            // делаем запрос на сервер по конкретному id,который достали из url
            const response = await axios.get<IComment[]>('http://localhost:5000/comments');

            return response;
        }
    })

    // при изменении массива комментариев и массива data?.data(самого товара) переобновляем массив комментарие,фильтруем его и помещаем в состояние(чтобы комментарии показывались для каждого товара отдельные)
    useEffect(() => {
        refetchComments();

        const dataCommentsForName = dataComments?.data.filter(c => c.nameFor === product.name); // массив данных комментариев фильтруем для каджого товара по его имени

        const commentsRating = dataCommentsForName?.reduce((prev, curr) => prev + curr.rating, 0); // проходимся по массиву объектов комментариев,отфильтрованных для каждого товара по имени и на каждой итерации увеличиваем переменную prev(это число,и мы указали,что в начале оно равно 0 и оно будет увеличиваться на каждой итерации массива объектов,запоминая старое состояние числа и увеличивая его на новое значение) на curr(текущий итерируемый объект).rating ,это чтобы посчитать общую сумму всего рейтинга от каждого комментария и потом вывести среднее значение

        // если commentsRating true(эта переменная есть и равна чему-то) и dataCommentsForName?.length true(этот массив отфильтрованных комментариев есть),то считаем средний рейтинг всех комментариев и записываем его в переменную,а потом в состояние,чтобы отобразить рейтинг
        if (commentsRating && dataCommentsForName?.length) {
            const commentsRatingMiddle = commentsRating / dataCommentsForName?.length; // считаем средний рейтинг комментариев для каждого товара,делим общее количество рейтинга каждого комменатрия на количество комментариев для каждого товара

            setCommentsRatingMain(commentsRatingMiddle);

        } else {
            setCommentsRatingMain(0); // если комментариев нет у этого товара,то меняем состояние рейтинга на 0
        }

        console.log(dataCommentsForName)


    }, [dataComments?.data])

    return (
        // указываем у div в onClick router(наш useNavigate) и указываем путь,куда будет вести этот useNavigate,указываем,что он будет вести на страницу товара по конкретному id (product.id)
        <div className="products__linkItem" onClick={() => router(`/catalog/${product.id}`)}>
            <div className="sectionCustom__products-item">
                <div className="products__item-imgBlock">
                    <img src={product.image} alt="" className="products__item-img" />
                </div>
                <div className="products__item-mark">
                    <div className="mark__stars">
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
                    <p className="mark__text">Reviews (4)</p>
                </div>
                <h2 className="products__item-title">{product.name}</h2>
                <p className="products__item-price">${product.price}</p>
            </div>
        </div>
    )
}

export default ProductItem;