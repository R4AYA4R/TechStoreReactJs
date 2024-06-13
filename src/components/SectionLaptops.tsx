import { useState } from "react";

const SectionLaptops = () => {

    const [tab, setTab] = useState<string>('gs');

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
                        <a href="#" className="sectionCustom__firstBlock-link">See All Products</a>
                    </div>
                    <div className="laptopsBlock__laptops">
                        {tab === 'gs' ?
                            <div className={tab === 'gs' ? 'sectionCustom__products-item sectionCustom__products-itemOp0' : 'sectionCustom__products-item '}>
                                <div className="products__item-imgBlock">
                                    <img src="/images/sectionLaptops/image 29.png" alt="" className="products__item-img" />
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
                                <p className="products__item-price">$399.00</p>
                            </div>
                            :
                            <div className={tab === 'gt' ? 'sectionCustom__products-item sectionCustom__products-itemOp2' : 'sectionCustom__products-item '}>
                                <div className="products__item-imgBlock">
                                    <img src="/images/sectionLaptops/image 29 (1).png" alt="" className="products__item-img" />
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
                                <p className="products__item-price">$349.00</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionLaptops;