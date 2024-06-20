import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IProduct } from "../types/types";
import axios from "axios";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const SectionLaptops = () => {

    const [tab, setTab] = useState<string>('gs');

    const msiCategory = 'MSI ALL-IN-ONE PCS'; // переменная для названия категории
    const hpCategory = 'HP/COMPAQ PCS';

    // запрос на сервер для товаров с категорией msi all-in-one pcs,указываем в queryKey другой ключ,чтобы не связывались запросы для общих товаров и товаров по конкретной категории в данном случае
    const {data,error} = useQuery({
        queryKey:['catalogProductsCategoryMsi'],
        queryFn:async () => {
            const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?category=${msiCategory}`, {
                params: {
                    _limit: 5,
                }
            });

            return response;
        }
    })

    // запрос на сервер для товаров с категорией hp/compaq pcs,даем другие название data и error,так как такие уже есть выше в коде,указываем в queryKey другой ключ,чтобы не связывались запросы для общих товаров и товаров по конкретной категории в данном случае
    const {data:dataHp,error:errorHp} = useQuery({
        queryKey:['catalogProductsCategoryHp'],
        queryFn:async () => {
            const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?category=${hpCategory}`, {
                params: {
                    _limit: 5,
                }
            });

            return response;
        }
    })

    return (
        <section className="sectionLaptops">
            <div className="sectionLaptops__inner">
                <div className="sectionLaptops__tabs">
                    <ul className="tabs__list">
                        <li className="tabs__list-item">
                            <button className={tab === 'gs' ? 'tabs__item-btn tabs__item-btn--active' : 'tabs__item-btn'} onClick={() => setTab('gs')}>MSI GS Series</button>
                        </li>
                        <li className="tabs__list-item">
                            <button className={tab === 'gt' ? 'tabs__item-btn tabs__item-btn--active' : 'tabs__item-btn'} onClick={() => setTab('gt')} >MSI GT Series</button>
                        </li>
                    </ul>
                </div>
                <div className="sectionLaptops__laptopsBlock sectionCustom__products">
                    <div className="sectionCustom__firstBlock sectionLaptops__firstBlock">
                        <h1 className="sectionCustom__firstBlock-title">MSI Laptops</h1>
                        <Link to="/catalog" className="sectionCustom__firstBlock-link">See All Products</Link>
                    </div>
                    <div className="laptopsBlock__laptops">
                        {tab === 'gs' ?
                            <div className={tab === 'gs' ? 'sectionLaptops__products sectionLaptops__products-Op0' : 'sectionLaptops__products'}>

                                {/* если есть ошибка,то выводим ее сообщение */}
                                {error && <h3>{error.message}</h3>}

                                {/* если data?.data.length true(то есть есть товары),то выводим их,в другом случае пустая строка(то есть ничего не выводим) */}
                                {data?.data.length ? data?.data.map(product =>
                                    <ProductItem key={product.id} product={product}/>)
                                    : ''
                                }

                            </div>
                            :
                            <div className={tab === 'gt' ? 'sectionLaptops__products sectionLaptops__products-Op2' : 'sectionLaptops__products '}>

                                {errorHp && <h3>{errorHp.message}</h3>}

                                {dataHp?.data.length ? dataHp?.data.map(product =>
                                    <ProductItem key={product.id} product={product}/>)
                                    : ''
                                }

                            </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionLaptops;