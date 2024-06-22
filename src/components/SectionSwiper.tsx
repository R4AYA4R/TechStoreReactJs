import { Autoplay, Navigation, Pagination } from 'swiper/modules'; // импортируем модули для swiper таким образом вручную
import { Swiper, SwiperSlide } from "swiper/react"; // импортируем Swiper и SwiperSlide имменно таким образом вручную,так как автоматически не импортируется

// стили для самого слайдера и его модулей
import 'swiper/css';
import 'swiper/css/pagination';

const SectionSwiper = ()=>{
    return(
        <section className="sectionSwiper">
            <div className="container">
                <div className="sectionSwiper__inner">
                    <Swiper
                        modules={[ Navigation,Pagination,Autoplay]} // указываем модули для swiper

                        slidesPerView={1} // количество слайдов для показа,можно указывать не только целые числа но и числа с точко(типа 2.5),можно указать еще значение 'auto',тогда будет автоматически формироваться ширина слайда контентом внутри него,или конкретно указанной шириной этому слайдеру в css

                        //автопрокрутка слайдов
                        autoplay={{
                            delay:2000 // пауза между прокруткой слайда в милисекундах
                        }}

                        // указываем,что у этого swiper есть пагинация и clickable true(то есть по элементам пагинации можно нажать)
                        pagination={{
                            clickable:true
                        }}

                        keyboard={{
                            enabled:true, // включает возможность управлять слайдером с клавиатуры с помощью стрелок

                            onlyInViewport:true, // делает возможность управления слайдера с клавиатуры только тогда,когда мы до него доскролили,а не всегда

                            pageUpDown:true // делает возможность управления слайдера с кнопками page Up и page Down
                        }}

                        // управление слайдером колесом мыши
                        mousewheel={{
                            sensitivity:1 // чувствительность колеса мыши
                        }}

                        loop={true} // бесконечность слайдера,то есть он может перелистываться из последнего слайда в первый и наоборот

                    >
                        <SwiperSlide>
                            <div className="swiperSlide__inner">
                                <div className="swiperSlide__topBlock">
                                    <h1 className="swiperSlide__title">''</h1>
                                    <p className="swiperSlide__text">My first order arrived today in perfect condition.  From the time I sent a question about the item to making the purchase, to the shipping and now the delivery, your company, Tecs, has stayed in touch.  Such great service.  I look forward to shopping on your site in the future and would highly recommend it.</p>
                                </div>
                                <div className="swiperSlide__bottomBlock">
                                    <p className="swiperSlide__bottomBlock-text">- Tama Brown</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiperSlide__inner">
                                <div className="swiperSlide__topBlock">
                                    <h1 className="swiperSlide__title">''</h1>
                                    <p className="swiperSlide__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat repellendus deleniti est tempore reiciendis perferendis aliquam, minus eum, doloribus cumque optio cupiditate rem? Unde quae reiciendis ex. Praesentium, alias natus?</p>
                                </div>
                                <div className="swiperSlide__bottomBlock">
                                    <p className="swiperSlide__bottomBlock-text">- Alex Harley</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiperSlide__inner">
                                <div className="swiperSlide__topBlock">
                                    <h1 className="swiperSlide__title">''</h1>
                                    <p className="swiperSlide__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis a harum sit. Voluptatibus harum laboriosam molestias doloribus architecto reiciendis, dicta illo praesentium? Doloribus alias numquam error labore voluptatum mollitia quas iste, aspernatur cupiditate in aliquid?</p>
                                </div>
                                <div className="swiperSlide__bottomBlock">
                                    <p className="swiperSlide__bottomBlock-text">- Michael Rainth</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="swiperSlide__inner">
                                <div className="swiperSlide__topBlock">
                                    <h1 className="swiperSlide__title">''</h1>
                                    <p className="swiperSlide__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti exercitationem magnam et mollitia, aperiam saepe culpa laboriosam, molestiae quam iusto explicabo consequuntur eos dicta minima, non minus incidunt voluptatum. Quod molestias sit voluptate vero! Quam temporibus dolor numquam beatae dolores!</p>
                                </div>
                                <div className="swiperSlide__bottomBlock">
                                    <p className="swiperSlide__bottomBlock-text">- Bob Aliense</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default SectionSwiper;