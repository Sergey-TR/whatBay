export default

function userData(shops, lists) {

    const data = [];
    for (let shop of shops) {
        const dataObj = {};
        const userLists = [];
        dataObj.shop_id = shop.id
        dataObj.shop_name = shop.shop_name
        dataObj.lists = userLists
        data.push(dataObj)

        for (let list of lists) {
            const listObj = {}
            if (shop.id === list.shop_id) {
                listObj.list_name = list.list_name
                listObj.day = list.created_at
                listObj.list_id = list.id
                userLists.push(listObj)
            }
        }
    }

    return data
}