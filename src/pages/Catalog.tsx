import { ChangeEvent, useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IProduct } from "../types/types";
import { getPagesArray } from "../utils/getPagesArray";
import { platform } from "os";
import SectionSupport from "../components/SectionSupport";

const Catalog = () => {

    const [categorySelect, setCategorySelect] = useState(false);
    const [priceSelect, setPriceSelect] = useState(false);
    const [sortBySelect, setSortBySelect] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [sortByFilter, setSortByFilter] = useState('');

    const [loader, setLoader] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const { data: dataWithoutLimitAndChecks, refetch: refetchWithoutLimitAndChecks } = useQuery({
        queryKey: ['catalogProductsWithoutLimitAndChecks'],
        queryFn: async () => {
            const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}`);

            return response;
        }
    })

    // делаем еще один запрос уже без лимита,чтобы отобразить все товары без лимита для отображения числа товаров
    const { data: dataWithoutLimit, refetch: refetchWithoutLimit } = useQuery({
        queryKey: ['catalogProductsWithoutLimit'],
        queryFn: async () => {
            // делаем проверки, если category,price,sortBy равно пустой строке, то запрос на сервер без этих параметров в url,в другом случае,запрос с этими параметрами в url
            if (categoryFilter === '' && priceFilter === '' && sortByFilter === '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}`);

                return response;

            } else if (categoryFilter !== '' && priceFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&category=${categoryFilter}&priceFilter=${priceFilter}`);

                return response;

            } else if (priceFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&priceFilter=${priceFilter}`);

                return response;

            } else if (categoryFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&category=${categoryFilter}`);

                return response;

            }

        }
    })

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['catalogProducts'],
        queryFn: async () => {
            // если category,price,sortBy равно пустой строке, то запрос на сервер без этих параметров в url,в другом случае,запрос с этими параметрами в url
            if (categoryFilter === '' && priceFilter === '' && sortByFilter === '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}`, {
                    params: {
                        _limit: limit,
                        _page: page
                    }
                });

                const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

                setTotalPages(Math.ceil(totalCount / limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

                return response;

            } else if (categoryFilter !== '' && priceFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&category=${categoryFilter}&priceFilter=${priceFilter}`, {
                    params: {
                        _limit: limit,
                        _page: page
                    }
                });

                const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

                setTotalPages(Math.ceil(totalCount / limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

                return response;

            } else if (priceFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&priceFilter=${priceFilter}`, {
                    params: {
                        _limit: limit,
                        _page: page
                    }
                });

                const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

                setTotalPages(Math.ceil(totalCount / limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

                return response;

            } else if (categoryFilter !== '') {

                const response = await axios.get<IProduct[]>(`http://localhost:5000/catalogProducts?name_like=${searchValue}&category=${categoryFilter}`, {
                    params: {
                        _limit: limit,
                        _page: page
                    }
                });

                const totalCount = data?.headers['x-total-count']; // записываем общее количество объектов(в данном случае объектов для товаров),полученных от сервера в переменную

                setTotalPages(Math.ceil(totalCount / limit)); //с помощью Math.ceil округляем получившееся значение в большую сторону,например,если элементов 105,а лимит 10,то округляем получившееся деление до 11,чтобы получить 11 страниц и вывести потом оставшиеся элементы на эту (11-ую в данном случае) страницу

                return response;

            }

        }
    })

    const filteredCustomPcs = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'CUSTOM PCS');

    const filteredMsi = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'MSI ALL-IN-ONE PCS');

    const filteredHp = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'HP/COMPAQ PCS');


    const filteredPriceMore0 = dataWithoutLimitAndChecks?.data.filter(p => p.price >= 0 && p.price < 1000);

    const filteredPriceMore1k = dataWithoutLimitAndChecks?.data.filter(p => p.price >= 1000 && p.price < 2000);

    const filteredPriceMore2k = dataWithoutLimitAndChecks?.data.filter(p => p.price >= 2000 && p.price < 3000);

    const filteredPriceMore3k = dataWithoutLimitAndChecks?.data.filter(p => p.price >= 3000);


    const filteredCustomAndPrice = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'CUSTOM PCS' && p.priceFilter === priceFilter);

    const filteredMsiAndPrice = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'MSI ALL-IN-ONE PCS' && p.priceFilter === priceFilter);

    const filteredHpAndPrice = dataWithoutLimitAndChecks?.data.filter(p => p.category === 'HP/COMPAQ PCS' && p.priceFilter === priceFilter);


    const filteredPriceMore0AndCategory = dataWithoutLimitAndChecks?.data.filter(p => p.category === categoryFilter && p.price >= 0 && p.price < 1000);

    const filteredPriceMore1kAndCategory = dataWithoutLimitAndChecks?.data.filter(p => p.category === categoryFilter && p.price >= 1000 && p.price < 2000);

    const filteredPriceMore2kAndCategory = dataWithoutLimitAndChecks?.data.filter(p => p.category === categoryFilter && p.price >= 2000 && p.price < 3000);

    const filteredPriceMore3kAndCategory = dataWithoutLimitAndChecks?.data.filter(p => p.category === categoryFilter && p.price >= 3000);






    // функция для удаления фильтров,можно было поместить все фильтры в одно состояние,но и так можно(их мало)
    const removeAllFilters = () => {
        setCategoryFilter('');
        setPriceFilter('');
        setSortByFilter('');
    }

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setPage(1);
    }

    const prevPage = () => {
        // если текущая страница больше или равна 2
        if (page >= 2) {
            setPage((prev) => prev - 1); // изменяем состояние текущей страницы на - 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    const nextPage = () => {
        // если текущая страница меньше или равна общему количеству страниц - 1(чтобы после последней страницы не переключалось дальше)
        if (page <= totalPages - 1) {
            setPage((prev) => prev + 1); // изменяем состояние текущей страницы на + 1(то есть в setPage берем prev(предыдущее значение,то есть текущее) и отнимаем 1)
        }
    }

    useEffect(() => {
        setLoader(true); // делаем состояние loader true

        // через 0.5s делаем состояние loader false(чтобы лоадер убрался)
        window.setTimeout(() => {
            setLoader(false);
        }, 500)


    }, [])

    // при изменении searchValue,то есть когда пользователь что-то вводит в инпут поиска,то изменяем category на пустую строку,соответственно будет сразу идти поиск по всем товарам,а не в конкретной категории,но после поиска можно будет результат товаров по поиску уже отфильтровать по категориям и делаем повторный запрос на сервер уже с измененным значение searchValue(чтобы поиск число показвалось правильно,когда вводят что-то в поиск)
    useEffect(() => {
        setCategoryFilter('');

        setPriceFilter('');

        refetchWithoutLimitAndChecks();

    }, [searchValue])

    // при изменении categoryFilter,priceFilter(при нажатии на категорию или фильтр цены) изменяем состояние page(текущей страницы) на 1,чтобы при этих фильтрах показывалось с первой страницы и не баговалось
    useEffect(() => {
        setPage(1);
    }, [categoryFilter, priceFilter])

    // делаем запрос через useQuery еще раз,при изменении page(состояния текущей страницы),data?.data (массив товаров),изменении инпута поиска и category(категории товаров)
    useEffect(() => {

        refetch();

        refetchWithoutLimit();

    }, [data?.data, page, searchValue, priceFilter, categoryFilter])

    let pagesArray = getPagesArray(totalPages, page);

    return (
        <section className="sectionCatalog">
            <div className="container">
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
                                            <p className="optionsBlock__text" onClick={() => setCategoryFilter('CUSTOM PCS')}>CUSTOM PCS</p>
                                            <p className="optionsBlock__optionBlock-number">({priceFilter !== '' ?
                                                filteredCustomAndPrice?.length
                                                :
                                                filteredCustomPcs?.length
                                            })</p> {/* если priceFilter не равен пустой строке(то есть он есть) и categoryFilter равно CUSTOM PCS(то есть эта категория выбрана),то показывать data?.data.length(длину массива объектов,отфильтрованных уже в запросе по categoryFilter и priceFilter),в другом случае просто длину массива объектов,отфильтрованных отдельно по category(категории),это чтобы отобразить число товаров при использовании фильтров categoryFilter и priceFilter */}
                                        </div>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setCategoryFilter('MSI ALL-IN-ONE PCS')}>MSI ALL-IN-ONE PCS</p>
                                            <p className="optionsBlock__optionBlock-number">({priceFilter !== '' ?
                                                filteredMsiAndPrice?.length
                                                :
                                                filteredMsi?.length
                                            })</p>
                                        </div>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setCategoryFilter('HP/COMPAQ PCS')}>HP/COMPAQ PCS</p>
                                            <p className="optionsBlock__optionBlock-number">({priceFilter !== '' ?
                                                filteredHpAndPrice?.length
                                                :
                                                filteredHp?.length
                                            })</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filterBar__select" onClick={() => setPriceSelect((prev) => !prev)}>
                                    <img src="/images/sectionCatalog/Vector 11.png" alt="" className={priceSelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                    <p className="filterBar__select-title">Price</p>
                                    <div className={priceSelect ? 'filterBar__select-optionsBlockPrice filterBar__select-optionsBlockPrice--active' : 'filterBar__select-optionsBlockPrice'}>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setPriceFilter('$0.00 - $1,000.00')}>$0.00 - $1,000.00</p>
                                            <p className="optionsBlock__optionBlock-number">({categoryFilter !== '' ?
                                                filteredPriceMore0AndCategory?.length
                                                :
                                                filteredPriceMore0?.length
                                            })</p> {/* если categoryFilter не равна пустой строке(то есть она есть,то есть категория выбрана),то показывать длину отфильтрованного массива по price конкретно этого блока и category, в другом случае показывать длину отфильтрованного массива только по конкретной price*/}
                                        </div>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setPriceFilter('$1,000.00 - $2,000.00')}>$1,000.00 - $2,000.00</p>
                                            <p className="optionsBlock__optionBlock-number">({categoryFilter !== '' ?
                                                filteredPriceMore1kAndCategory?.length
                                                :
                                                filteredPriceMore1k?.length
                                            })</p>
                                        </div>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setPriceFilter('$2,000.00 - $3,000.00')}>$2,000.00 - $3,000.00</p>
                                            <p className="optionsBlock__optionBlock-number">({categoryFilter !== '' ?
                                                filteredPriceMore2kAndCategory?.length
                                                :
                                                filteredPriceMore2k?.length
                                            })</p>
                                        </div>
                                        <div className="optionsBlock__optionBlock">
                                            <p className="optionsBlock__text" onClick={() => setPriceFilter('$3,000.00 And Above')}>$3,000.00 And Above</p>
                                            <p className="optionsBlock__optionBlock-number">({categoryFilter !== '' ?
                                                filteredPriceMore3kAndCategory?.length
                                                :
                                                filteredPriceMore3k?.length
                                            })</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="filterBar__select" onClick={() => setSortBySelect((prev) => !prev)}>
                                    <img src="/images/sectionCatalog/Vector 11.png" alt="" className={sortBySelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                    <p className="filterBar__select-title">Sort By</p>
                                    <div className={sortBySelect ? 'filterBar__select-optionsBlock filterBar__select-optionsBlock--active' : 'filterBar__select-optionsBlock'}>
                                        <p className="optionsBlock__text" onClick={() => setSortByFilter('Rating')}>Rating</p>
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
                                <p className="productsBlock__topBlock-text">{dataWithoutLimit?.data.length} items</p>
                                <input type="text" className="productsBlock__topBlock-input" placeholder="Search" value={searchValue} onChange={inputChangeHandler} />
                            </div>

                            {/* если состояния фильтров не равны пустым строкам,то отображаем блок с фильтрами и внутри него делаем проверки на каждый фильтр(существует ли он) и тогда показывать или не показывать блоки этих фильтров */}
                            {categoryFilter !== '' || priceFilter !== '' || sortByFilter !== '' ?
                                <div className="productsBlock__filtersBlock">
                                    {categoryFilter !== '' ?
                                        <div className="productsBlock__filtersBlock-filter">
                                            <p className="filter__text">{categoryFilter}</p>
                                            <button className="filter__btn" onClick={() => setCategoryFilter('')}>
                                                <img src="/images/sectionCatalog/Group 108.png" alt="" className="filter__btn-img" />
                                            </button>
                                        </div>
                                        : ''
                                    }

                                    {priceFilter !== '' ?
                                        <div className="productsBlock__filtersBlock-filter">
                                            <p className="filter__text">{priceFilter}</p>
                                            <button className="filter__btn" onClick={() => setPriceFilter('')}>
                                                <img src="/images/sectionCatalog/Group 108.png" alt="" className="filter__btn-img" />
                                            </button>
                                        </div>
                                        : ''
                                    }

                                    {sortByFilter !== '' ?
                                        <div className="productsBlock__filtersBlock-filter">
                                            <p className="filter__text">{sortByFilter}</p>
                                            <button className="filter__btn" onClick={() => setSortByFilter('')}>
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
                                        <ProductItem key={product.id} product={product} />)
                                        : !error ?
                                            <h4>Not found</h4>
                                            : ''
                                    }
                                </div>
                            }

                            {/* если длина массива объектов true(то есть товары есть),то показывать пагинацию,в другом случае пустая строка(то есть ничего не показывать) */}
                            {data?.data.length ?
                                <div className="productsBlock__pages">

                                    <button className="productsBlock__pages-page" onClick={prevPage}>{'<'}</button>

                                    {pagesArray.map(p =>
                                        <button
                                            key={p}

                                            className={page === p ? "productsBlock__pages-page productsBlock__pages-page--active" : "productsBlock__pages-page"} //если состояние номера страницы page равно значению элементу массива pagesArray,то отображаем такие классы,в другом случае другие

                                            onClick={() => setPage(p)} // отслеживаем на какую кнопку нажал пользователь и делаем ее активной,изменяем состояние текущей страницы page на значение элемента массива pagesArray(то есть страницу,на которую нажал пользователь)
                                        >
                                            {p}
                                        </button>
                                    )}

                                    {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем три точки */}
                                    {totalPages > 4 && page < totalPages - 2 && <div className="productsBlock__pages-dots">...</div>}

                                    {/* если общее количество страниц больше 3 и текущая страница меньше общего количества страниц - 1,то отображаем кнопку последней страницы */}
                                    {totalPages > 3 && page < totalPages - 1 && <button className="productsBlock__pages-page" onClick={() => setPage(totalPages)}>{totalPages}</button>}

                                    <button className="productsBlock__pages-page" onClick={nextPage}>{'>'}</button>

                                </div>
                                : ''
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalog;