import { useParams } from "react-router-dom";

const ProductIdPage = () => {

    const params = useParams(); //useParams выцепляет параметр из url (в данном случае id товара)

    return(
        <div>
            product id page {params.id} {/* указываем у нашего params (useParams) параметр из url (id) */}
        </div>
    )
}

export default ProductIdPage;