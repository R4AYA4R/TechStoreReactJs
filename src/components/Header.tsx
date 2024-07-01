import { Link, NavLink } from "react-router-dom";
import { apiBasket } from "../store/apiBasket";
import { useState } from "react";

const Header = () => {

    const { data } = apiBasket.useGetAllProductsBasketQuery(null);

    const [isActiveMenuMobile,setIsActiveMenuMobile] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__link-logo">
                        <img src="/images/header/1.png" alt="" className="header__logo" />
                    </Link>
                    <ul className="header__menu-list">
                        <li className="menu__list-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>Home</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>Catalog</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>About Us</NavLink>
                        </li>
                        <li className="menu__list-item menu__list-itemCart">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>
                                <img src="/images/header/jam_shopping-cart.png" alt="" className="menu__link-cartImg" />
                                <span className="menu__link-spanCart">{data?.length}</span>
                            </NavLink>
                        </li>
                    </ul>



                    <ul className={isActiveMenuMobile ? "header__menuMobile-list header__menuMobile-list--active" : "header__menuMobile-list"}>
                        <li className="menuMobile__list-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'menuMobile__item-link menuMobile__item-link--active' : 'menuMobile__item-link'}>Home</NavLink>
                        </li>
                        <li className="menuMobile__list-item">
                            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'menuMobile__item-link menuMobile__item-link--active' : 'menuMobile__item-link'}>Catalog</NavLink>
                        </li>
                        <li className="menuMobile__list-item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'menuMobile__item-link menuMobile__item-link--active' : 'menuMobile__item-link'}>About Us</NavLink>
                        </li>
                        <li className="menu__list-itemCart menuMobile__list-itemCart">
                            <NavLink to="/cart" className={({ isActive }) => isActive ? 'menuMobile__itemCart-link menuMobileCart__item-link--active' : 'menuMobile__itemCart-link'}>
                                <img src="/images/header/jam_shopping-cart.png" alt="" className="menu__link-cartImg" />
                                <span className="menu__link-spanCart">{data?.length}</span>
                            </NavLink>
                        </li>
                    </ul>

                    <button className="header__menuBtn" onClick={()=>setIsActiveMenuMobile((prev) => !prev)}>
                        <span className={isActiveMenuMobile ? "menuBtn__span menuBtn__spanActive1" : "menuBtn__span"}></span>
                        <span className={isActiveMenuMobile ? "menuBtn__span menuBtn__spanActive2" : "menuBtn__span"}></span>
                        <span className={isActiveMenuMobile ? "menuBtn__span menuBtn__spanActive3" : "menuBtn__span"}></span>
                        <span className={isActiveMenuMobile ? "menuBtn__span menuBtn__spanActive4" : "menuBtn__span"}></span>
                    </button>

                </div>
            </div>
        </header>
    )
}

export default Header;