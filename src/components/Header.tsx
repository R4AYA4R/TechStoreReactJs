import { Link, NavLink } from "react-router-dom";
import { apiBasket } from "../store/apiBasket";

const Header = ()=>{

    const {data} = apiBasket.useGetAllProductsBasketQuery(null);

    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <Link to="/" className="header__link-logo">
                        <img src="/images/header/1.png" alt="" className="header__logo" />
                    </Link>
                    <ul className="header__menu-list">
                        <li className="menu__list-item">
                            <NavLink to="/" className={({isActive}) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>Home</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <NavLink to="/catalog" className={({isActive}) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>Catalog</NavLink>
                        </li>
                        <li className="menu__list-item">
                            <a href="#" className="menu__item-link">About us</a>
                        </li>
                        <li className="menu__list-item menu__list-itemCart">
                            <NavLink to="/cart" className={({isActive}) => isActive ? 'menu__item-link menu__item-link--active' : 'menu__item-link'}>
                                <img src="/images/header/jam_shopping-cart.png" alt="" className="menu__link-cartImg" />
                                <span className="menu__link-spanCart">{data?.length}</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;