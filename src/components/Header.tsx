
const Header = ()=>{
    return(
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a href="" className="header__link-logo">
                        <img src="/images/header/1.png" alt="" className="header__logo" />
                    </a>
                    <ul className="header__menu-list">
                        <li className="menu__list-item">
                            <a href="#" className="menu__item-link">Home</a>
                        </li>
                        <li className="menu__list-item">
                            <a href="#" className="menu__item-link">Catalog</a>
                        </li>
                        <li className="menu__list-item">
                            <a href="#" className="menu__item-link">About</a>
                        </li>
                        <li className="menu__list-item">
                            <a href="#" className="menu__item-link">Contact us</a>
                        </li>
                        <li className="menu__list-item menu__list-itemCart">
                            <a href="#" className="menu__item-link">
                                <img src="/images/header/jam_shopping-cart.png" alt="" className="menu__link-cartImg" />
                                <span className="menu__link-spanCart">0</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;