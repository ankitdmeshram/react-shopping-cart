import React, {useState, useEffect} from 'react'
import  Axios from 'axios'
import { random, commerce} from 'faker'
import { 
    Container,
    Col,
    Row
} from 'reactstrap'
import CartItem from './CartItem'

const apiKey = "0c15389f0a78551e88b160537cf635cc"
const localurl = "https://api.npoint.io/071a4700e9b8553ac771"


const BuyPage = ({addInCart}) => {

        const [product, setProduct] = useState([])

    // const fetchPhotos = async () => {
    //     const response = await Axios.get(url, {
    //         header: {
    //             Authorization: apiKey
    //         }
    //     });

    const fetchPhotos = async () => {
        const {data} = await Axios.get(localurl);

    const { photos } = data;

    const allProduct = photos.map(photo => ({
        smallImage: photo.src.medium,
        tinyImage: photo.src.tiny,
        productName: random.word(),
        productPrice: commerce.price(),
        id: random.uuid()
    }))

    setProduct(allProduct);

};

    useEffect(() => {
        fetchPhotos();
    }, []);



    return (
        <Container fluid>
            <h1 className="text-success text-center">
                Buy Page
            </h1>
            <Row>
                {product.map(product => (
                <Col md={4} key={product.id}>
                    <CartItem product={product} addInCart={addInCart} />
                </Col>
                ))}
            </Row>

        </Container>
    )
}

export default BuyPage
