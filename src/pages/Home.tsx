import SectionCompanies from "../components/SectionCompanies";
import SectionCustom from "../components/SectionCustom";
import SectionLaptops from "../components/SectionLaptops";
import SectionMonitors from "../components/SectionMonitors";
import SectionSwiper from "../components/SectionSwiper";
import SectionTop from "../components/SectionTop";



const Home = () => {
    return (
        <>
            <SectionTop />
            <SectionCustom />
            <SectionLaptops />
            <SectionMonitors />
            <SectionCompanies />
            <SectionSwiper />
        </>
    )
}

export default Home;