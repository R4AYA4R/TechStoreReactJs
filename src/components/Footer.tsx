

const Footer=()=>{
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">
                    <div className="footer__top">
                        <div className="footer__titles">
                            <h1 className="footer__title">Information
                            </h1>
                            <h1 className="footer__title">Desktop PCs</h1>
                            <h1 className="footer__title">Laptops</h1>
                            <h1 className="footer__title">Address</h1>
                        </div>
                        <div className="footer__lists">
                            <ul className="footer__menu">
                                <li className="footer__menu-item">
                                    <a href="#" className="footer__menu-link">About Us</a>
                                    <a href="#" className="footer__menu-link">About Zip</a>
                                    <a href="#" className="footer__menu-link">Privacy Policy</a>
                                    <a href="#" className="footer__menu-link">Search</a>
                                    <a href="#" className="footer__menu-link">Terms</a>
                                    <a href="#" className="footer__menu-link">Contact Us</a>
                                </li>
                            </ul>
                            <ul className="footer__menu">
                                <li className="footer__menu-item">
                                    <a href="#" className="footer__menu-link">Custom PCs</a>
                                    <a href="#" className="footer__menu-link">Servers</a>
                                    <a href="#" className="footer__menu-link">MSI All-In-One PCs</a>
                                    <a href="#" className="footer__menu-link">Tecs PCs</a>
                                </li>
                            </ul>
                            <ul className="footer__menu">
                                <li className="footer__menu-item">
                                    <a href="#" className="footer__menu-link">Everyday Use Notebooks
                                    </a>
                                    <a href="#" className="footer__menu-link">MSI Workstation Series
                                    </a>
                                    <a href="#" className="footer__menu-link">MSI Prestige Series
                                    </a>
                                    <a href="#" className="footer__menu-link">Infinity Gaming Notebooks</a>
                                </li>
                            </ul>
                            <ul className="footer__menu">
                                <li className="footer__menu-item">
                                    <p className="footer__menu-textAddress">Address: 1234 Street Adress City Address, 1234</p>
                                    <p className="footer__menu-link">Phones: <a href="#" className="footer__menu-linkPhone">(00) 1234 5678</a></p>
                                    <p className="footer__menu-textAddress">We are open: Monday-Thursday: 9:00 AM - 5:30 PM</p>
                                    <p className="footer__menu-textAddress">Friday: 9:00 AM - 6:00 PM</p>
                                    <p className="footer__menu-link">E-mail: <a href="#" className="footer__menu-linkPhone">shop@email.com</a></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <div className="footer__bottom-images">
                            <a href="#" className="images__link">
                                <img src="/images/footer/ant-design_facebook-filled.png" alt="" className="images__link-img" />
                            </a>
                            <a href="#" className="images__link">
                                <img src="/images/footer/ant-design_instagram-filled.png" alt="" className="images__link-img" />
                            </a>
                        </div>
                        <p className="footer__bottom-text">Copyright © 2020 Shop Pty. Ltd.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;