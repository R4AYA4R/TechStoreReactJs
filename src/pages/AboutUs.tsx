
const AboutUs = () => {
    return (
        <section className="sectionAbout">

            <div className="sectionAbout__inner">
                <div className="sectionAbout__top">
                    <div className="container">
                        <p className="sectionAbout__top-text">Home {'>'} About Us</p>
                        <h1 className="sectionAbout__top-title">About Us</h1>
                    </div>
                </div>

                <div className="sectionAbout__firstBlock">
                    <div className="container">
                        <div className="sectionAbout__firstBlock-inner">
                            <div className="sectionAbout__firstBlock-info">
                                <h2 className="sectionAbout__firstBlock-title">A Family That Keeps On Growing</h2>
                                <p className="sectionAbout__firstBlock-text">We always aim to please the home market, supplying great computers and hardware at great prices to non-corporate customers, through our large Melbourne CBD showroom and our online store.</p>
                                <p className="sectionAbout__firstBlock-text">Shop management approach fosters a strong customer service focus in our staff. We prefer to cultivate long-term client relationships rather than achieve quick sales, demonstrated in the measure of our long-term success.</p>
                            </div>
                            <img src="/images/sectionAbout/Rectangle 54.png" alt="" className="sectionAbout__firstBlock-img" />
                        </div>
                    </div>
                </div>

                <div className="sectionAbout__secondBlock">
                    <div className="container">
                        <div className="sectionAbout__secondBlock-inner">
                            <img src="/images/sectionAbout/Rectangle 11.png" alt="" className="sectionAbout__secondBlock-img" />
                            <div className="sectionAbout__secondBlock-info">
                                <div className="secondBlock__info-top">
                                    <img src="/images/sectionAbout/Frame 205.png" alt="" className="info__top-img" />
                                    <h3 className="secondBlock__info-title">Shop.com</h3>
                                </div>
                                <p className="sectionAbout__secondBlock-text">Shop.com is a proudly Australian owned, Melbourne based supplier of I.T. goods and services, operating since 1991. Our client base encompasses individuals, small business, corporate and government organisations. We provide complete business IT solutions, centred on high quality hardware and exceptional customer service.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sectionAbout__thirdBlock">
                    <div className="container">
                        <div className="sectionAbout__thirdBlock-inner">
                            <div className="sectionAbout__thirdBlock-left">
                                <div className="thirdBlock__left-top">
                                    <img src="/images/sectionAbout/Group 174.png" alt="" className="left__top-img" />
                                    <h4 className="left__top-title">Now You're In Safe
                                    Hands</h4>
                                </div>
                                <p className="thirdBlock__left-text">Experience a 40% boost in computing from last generation. MSI Desktop equips the 10th Gen. Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.</p>
                                <p className="thirdBlock__left-text">*Performance compared to i7-9700. Specs varies by model.</p>
                            </div>
                            <img src="/images/sectionAbout/Mask Group.png" alt="" className="sectionAbout__thirdBlock-img" />
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default AboutUs;