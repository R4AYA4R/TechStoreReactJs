import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import { getPagesArray } from "../utils/getPagesArray";

const Catalog = () => {

    const [categorySelect, setCategorySelect] = useState(false);
    const [priceSelect, setPriceSelect] = useState(false);
    const [sortBySelect, setSortBySelect] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [sortByFilter, setSortByFilter] = useState('');

    const [loader,setLoader]=useState(false);

    const [limit,setLimit] = useState(5);
    const [page,setPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);

    const {data,isLoading,error,refetch} = useQuery({
        queryKey:['catalogProducts'],
        queryFn: async () => {
            const response = await axios.get<IProduct[]>('http://localhost:5000/catalogProducts',{
                params:{
                    _limit:limit,
                    _page:page
                }
            });

            const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

            setTotalPages(Math.ceil(totalCount/limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

            return response;
        }
    })



    // функция для удаления фильтров,можно было поместить все фильтры в одно состояние,но и так можно(их мало)
    const removeAllFilters=()=>{
        setCategoryFilter('');
        setPriceFilter('');
        setSortByFilter('');
    }

    const prevPage=()=>{
        // если текущая страница больше или равна 2
        if(page >= 2){
            setPage((prev) => prev - 1); // изменяем состояние текущей страницы на - 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    const nextPage=()=>{
        // если текущая страница меньше или равна общему количеству страниц - 1(чтобы после последней страницы не переключалось дальше)
        if(page <= totalPages - 1){
            setPage((prev) => prev + 1); // изменяем состояние текущей страницы на + 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    useEffect(()=>{
        setLoader(true); // делаем состояние loader true

        // через 0.5s делаем состояние loader false(чтобы лоадер убрался)
        window.setTimeout(()=>{
            setLoader(false);
        },500) 


    },[])

    // делаем запрос через useQuery еще раз,при изменении page(состояния текущей страницы),data?.data (массив товаров),изменении инпута поиска и category(категории товаров)
    useEffect(()=>{

        refetch();

    },[data?.data,page])

    let pagesArray = getPagesArray(totalPages,page);

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

                        <div className="productsBlock__pages">

                            <button className="productsBlock__pages-page" onClick={prevPage}>{'<'}</button>

                            {pagesArray.map(p => 
                                <button
                                    key = {p}

                                    className={page === p ? "productsBlock__pages-page productsBlock__pages-page--active" : "productsBlock__pages-page"} //если состояние номера страницы page равно значению элементу массива pagesArray,то отображаем такие классы,в другом случае другие

                                    onClick={()=>setPage(p)} // отслеживаем на какую кнопку нажал пользователь и делаем ее активной,изменяем состояние текущей страницы page на значение элемента массива pagesArray(то есть страницу,на которую нажал пользователь)
                                >
                                    {p}
                                </button>
                            )}

                            {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем три точки */}
                            {totalPages > 4 && page < totalPages - 2 && <div className="productsBlock__pages-dots">...</div>}

                            {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем кнопку последней страницы */}
                            {totalPages > 3 && page < totalPages - 1 && <button className="productsBlock__pages-page" onClick={()=>setPage(totalPages)}>{totalPages}</button>}

                            <button className="productsBlock__pages-page" onClick={nextPage}>{'>'}</button>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalog;