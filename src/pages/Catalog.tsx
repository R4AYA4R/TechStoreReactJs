import { useState } from "react";

const Catalog = () => {

    const [categorySelect,setCategorySelect] = useState(false);
    const [priceSelect,setPriceSelect] = useState(false);
    const [sortBySelect,setSortBySelect] = useState(false);

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
                            <div className="filterBar__select" onClick={()=>setCategorySelect((prev)=>!prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={categorySelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Category</p>
                                <div className={categorySelect ? 'filterBar__select-optionsBlock filterBar__select-optionsBlock--active' : 'filterBar__select-optionsBlock'}>
                                    <p className="optionsBlock__text">CUSTOM PCS</p>
                                    <p className="optionsBlock__text">MSI ALL-IN-ONE PCS</p>
                                    <p className="optionsBlock__text">HP/COMPAQ PCS</p>
                                </div>
                            </div>
                            <div className="filterBar__select" onClick={()=>setPriceSelect((prev)=>!prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={priceSelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Price</p>
                                <div className={priceSelect ? 'filterBar__select-optionsBlockPrice filterBar__select-optionsBlockPrice--active' : 'filterBar__select-optionsBlockPrice'}>
                                    <p className="optionsBlock__text">$0.00 - $1,000.00</p>
                                    <p className="optionsBlock__text">$1,000.00 - $2,000.00</p>
                                    <p className="optionsBlock__text">$2,000.00 - $3,000.00</p>
                                    <p className="optionsBlock__text">$3,000.00 And Above</p>
                                </div>
                            </div>
                            <div className="filterBar__select" onClick={()=>setSortBySelect((prev)=>!prev)}>
                                <img src="/images/sectionCatalog/Vector 11.png" alt="" className={sortBySelect ? "filterBar__select-img filterBar__select-img--active" : "filterBar__select-img"} />
                                <p className="filterBar__select-title">Sort By</p>
                                <div className={sortBySelect ? 'filterBar__select-optionsBlock filterBar__select-optionsBlock--active' : 'filterBar__select-optionsBlock'}>
                                    <p className="optionsBlock__text">Rating</p>
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
                        <div className="productsBlock__products">
                            <div className="sectionCustom__products-item">
                                <div className="products__item-imgBlock">
                                    <img src="/images/sectionCustom/image 29.jpg" alt="" className="products__item-img" />
                                </div>
                                <div className="products__item-mark">
                                    <div className="mark__stars">
                                        <div className="mark__stars1">
                                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars1-img" />
                                        </div>
                                        <div className="mark__stars2">
                                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars2-img" />
                                        </div>
                                        <div className="mark__stars3">
                                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars3-img" />
                                        </div>
                                        <div className="mark__stars4">
                                            <img src="/images/sectionCustom/Star 6.png" alt="" className="mark__stars4-img" />
                                        </div>
                                        <div className="mark__stars5">
                                            <img src="/images/sectionCustom/Star 10.png" alt="" className="mark__stars5-img" />
                                        </div>
                                    </div>
                                    <p className="mark__text">Reviews (4)</p>
                                </div>
                                <h2 className="products__item-title">EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...</h2>
                                <p className="products__item-price">$499.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Catalog;