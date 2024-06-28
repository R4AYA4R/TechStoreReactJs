import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiBasket } from "./apiBasket";

// если несколько редьюсеров на сайте,то можно их объединить с помощью combineReducers и передать потом в store
const reducers = combineReducers({
    [apiBasket.reducerPath]:apiBasket.reducer, // указываем наш api для rtk query,указываем его reducerPath(название) и его редьюсер
})

// создаем и экспортируем store
export const store = configureStore({
    reducer:reducers,

    //указываем мидлвэир для нашего rtk query,добавляем в массив дефолтного мидлвэира мидлвэир от нашего api(rtk query),мидлвэир-прослойка(функция),которая появляется в определенном этапе и выполняет какие-то действия,например,делает проверку на какое-то условие и тд,добавляем в скобках в concat через запятую второй мидлвеир для второго нашего api
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(apiBasket.middleware)
})