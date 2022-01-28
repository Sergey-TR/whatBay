export default function productFilter (category_id, products) {
    const filterProducts = products.filter(item => item.category_id === category_id);

    return filterProducts

}