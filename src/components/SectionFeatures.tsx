
const SectionFeatures=()=>{
    return(
        <section className="sectionFeatures">
            <div className="container">
                <div className="sectionFeatures__inner">
                    <div className="sectionFeatures__top">
                        <h1 className="sectionFeatures__top-title">Features</h1>
                        <p className="sectionFeatures__top-desc">The MPG series brings out the best in gamers by allowing full expression in color with advanced RGB lighting control and synchronization.</p>
                    </div>
                    <div className="sectionFeatures__features">
                        <div className="sectionFeatures__features-item">
                            <img src="/images/sectionFeatures/Group 17.png" alt="" className="features__item-img" />
                            <p className="features__item-text">Intel® Core™ i7 processor with the upmost computing power to bring you an unparalleled gaming experience.</p>
                        </div>
                        <div className="sectionFeatures__features-item">
                            <img src="/images/sectionFeatures/Group 16.png" alt="" className="features__item-img" />
                            <p className="features__item-text">The new GeForce® RTX SUPER™ Series has more cores and higher clocks for superfast performance compared to previous-gen GPUs.</p>
                        </div>
                        <div className="sectionFeatures__features-item">
                            <img src="/images/sectionFeatures/Group 15.png" alt="" className="features__item-img" />
                            <p className="features__item-text">Unleash the full potential with the latest SSD technology, the NVM Express. 6 times faster than traditional SATA SSD.</p>
                        </div>
                        <div className="sectionFeatures__features-item">
                            <img src="/images/sectionFeatures/Group 14.png" alt="" className="features__item-img" />
                            <p className="features__item-text">Featuring the latest 10th Gen Intel® Core™ processors, memory can support up to DDR4 2933MHz to delivers an unprecedented gaming experience.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SectionFeatures;