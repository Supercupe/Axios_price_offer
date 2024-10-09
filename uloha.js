import axios from "axios"

const API_URL = "https://api.apify.com/v2/datasets/VuFwckCdhVhoLJJ08/items?clean=true&format=json"

async function getData() {
    const response = await axios.get(API_URL);
    return response.data
}

function numeric_price(dollar_price){
    let number = dollar_price.replace("$", "").replace(" ", "")
    return parseFloat(number)
}

async function main(){
    const data = await getData();
    let lowest_price_product = {};
    let id= []

    for (const offer of data) {
        const productId = offer.productId;
        const price = numeric_price(offer.price);

        if (!lowest_price_product[productId] || price < numeric_price(lowest_price_product[productId].price)) {
            lowest_price_product[productId] = offer;
        }else{
            console.log("not pushed")
        }
    }
    console.log(lowest_price_product)
    return lowest_price_product
}
main()