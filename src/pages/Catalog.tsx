import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";

const Catalog = () => {

    const [categorySelect, setCategorySelect] = useState(false);
    const [priceSelect, setPriceSelect] = useState(false);
    const [sortBySelect, setSortBySelect] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [sortByFilter, setSortByFilter] = useState('');

    const [loader,setLoader]=useState(false);

    const {data,isLoading,error} = useQuery({
        queryKey:['catalogProducts'],
        queryFn: async () => {
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts');

            return response;
        }
    })



    // функция для удаления фильтров,можно было поместить все фильтры в одно состояние,но и так можно(их мало)
    const removeAllFilters=()=>{
        setCategoryFilter('');
        setPriceFilter('');
        setSortByFilter('');
    }

    useEffect(()=>{
        setLoader(true); // делаем состояние loader true

        // через 0.5s делаем состояние loader false(чтобы лоадер убрался)
        window.setTimeout(()=>{
            setLoader(false);
        },500) 


    },[])


    return (
        <section className="sectionCatalog">
            <div className="sectionCatalog__inner">
                <img src="/images/sectionCatalog/image 26.jpg" alt="" className="sectionCatalog__img" />
                <div className="sectionCatalog__topText">
                    <p className="sectionCatalog__topText-text">Home {'>'} Catalog</p>
                </div>
                <div className="sectionCatalog__mainBlock">
                    <div className="sectionCatalog__mainBlock-filterBar">
                        <div className="filterBar__main">
                            <h2 className="filterBar__title">Filters</h2>
                            <div className="filterBar__select" onClick={() => setCategorySelect((prev) => !prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={categorySelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Category</p>
                                <div className={categorySelect ? 'filterBar__select-optionsBlock filterBar__select-optionsBlock--active' : 'filterBar__select-optionsBlock'}>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setCategoryFilter('CUSTOM PCS')}>CUSTOM PCS</p>
                                        <p className="optionsBlock__optionBlock-number">(20)</p>
                                    </div>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setCategoryFilter('MSI ALL-IN-ONE PCS')}>MSI ALL-IN-ONE PCS</p>
                                        <p className="optionsBlock__optionBlock-number">(5)</p>
                                    </div>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setCategoryFilter('HP/COMPAQ PCS')}>HP/COMPAQ PCS</p>
                                        <p className="optionsBlock__optionBlock-number">(10)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="filterBar__select" onClick={() => setPriceSelect((prev) => !prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={priceSelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Price</p>
                                <div className={priceSelect ? 'filterBar__select-optionsBlockPrice filterBar__select-optionsBlockPrice--active' : 'filterBar__select-optionsBlockPrice'}>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setPriceFilter('$0.00 - $1,000.00')}>$0.00 - $1,000.00</p>
                                        <p className="optionsBlock__optionBlock-number">(20)</p>
                                    </div>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setPriceFilter('$1,000.00 - $2,000.00')}>$1,000.00 - $2,000.00</p>
                                        <p className="optionsBlock__optionBlock-number">(10)</p>
                                    </div>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setPriceFilter('$2,000.00 - $3,000.00')}>$2,000.00 - $3,000.00</p>
                                        <p className="optionsBlock__optionBlock-number">(8)</p>
                                    </div>
                                    <div className="optionsBlock__optionBlock">
                                        <p className="optionsBlock__text" onClick={()=>setPriceFilter('$3,000.00 And Above')}>$3,000.00 And Above</p>
                                        <p className="optionsBlock__optionBlock-number">(5)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="filterBar__select" onClick={() => setSortBySelect((prev) => !prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={sortBySelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Sort By</p>
                                <div className={sortBySelect ? 'filterBar__select-optionsBlock filterBar__select-optionsBlock--active' : 'filterBar__select-optionsBlock'}>
                                    <p className="optionsBlock__text" onClick={()=>setSortByFilter('Rating')}>Rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="filterBar__images">
                            <ul className="filterBar__images-list">
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33.png" alt="" className="images__item-img" />
                                </li>
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33 (1).png" alt="" className="images__item-img" />
                                </li>
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33 (2).png" alt="" className="images__item-img" />
                                </li>
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33 (3).png" alt="" className="images__item-img" />
                                </li>
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33 (4).png" alt="" className="images__item-img" />
                                </li>
                                <li className="images__list-item">
                                    <img src="/images/sectionCompanies/image 33 (5).png" alt="" className="images__item-img" />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="sectionCatalog__mainBlock-productsBlock">
                        <div className="productsBlock__topBlock">
                            <p className="productsBlock__topBlock-text">10 items</p>
                            <input type="text" className="productsBlock__topBlock-input" placeholder="Search" />
                        </div>

                        {/* если состояния фильтров не равны пустым строкам,то отображаем блок с фильтрами и внутри него делаем проверки на каждый фильтр(существует ли он) и тогда показывать или не показывать блоки этих фильтров */}
                        {categoryFilter !== '' || priceFilter !== '' || sortByFilter !== '' ?
                            <div className="productsBlock__filtersBlock">
                                {categoryFilter !== '' ?
                                    <div className="productsBlock__filtersBlock-filter">
                                        <p className="filter__text">{categoryFilter}</p>
                                        <button className="filter__btn" onClick={()=>setCategoryFilter('')}>
                                            <img src="/images/sectionCatalog/Group 108.png" alt="" className="filter__btn-img" />
                                        </button>
                                    </div>
                                    : ''
                                }

                                {priceFilter !== '' ?
                                    <div className="productsBlock__filtersBlock-filter">
                                        <p className="filter__text">{priceFilter}</p>
                                        <button className="filter__btn" onClick={()=>setPriceFilter('')}>
                                            <img src="/images/sectionCatalog/Group 108.png" alt="" className="filter__btn-img" />
                                        </button>
                                    </div>
                                    : ''
                                }

                                {sortByFilter !== '' ?
                                    <div className="productsBlock__filtersBlock-filter">
                                        <p className="filter__text">{sortByFilter}</p>
                                        <button className="filter__btn" onClick={()=>setSortByFilter('')}>
                                            <img src="/images/sectionCatalog/Group 108.png" alt="" className="filter__btn-img" />
                                        </button>
                                    </div>
                                    : ''
                                }


                                <button className="productsBlock__filterBlock-clear" onClick={removeAllFilters}>Clear All</button>

                            </div>
                            : ''
                        }

                        {error && <h3>{error.message}</h3>}

                        {/* если isLoading true или loader true,то показываем загрузку,в другом случае если data?.data.length(длина массива товаров) true(то есть они есть),выводим товары в другом случае если !error true(то есть error = false,ошибки нет),то выводим Not found,в другом случае,если ошибка есть,выводим пустую строку(то есть текст not found не выводим) */}
                        {isLoading || loader ?
                            <div className="productsBlock__loaderBlock">
                                <div className="loaderBlock__loader"></div>
                            </div>
                            :
                            <div className="productsBlock__products">
                                {data?.data.length ? data?.data.map(product =>
                                    <ProductItem key={product.id} product={product}/>)
                                    : !error ? 
                                        <h4>Not found</h4>
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

export default Catalog;