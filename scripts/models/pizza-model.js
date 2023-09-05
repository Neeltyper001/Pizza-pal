// Data Modelling
class Pizza{
    constructor(id, name , price , url, desc){
        this.id = id;
        this. name =  name;
        this.price = price;
        this.url = url;
        this.desc = desc;
        this.isAddedInCart = false;
        this.quantity = 0;
    }
}

export default Pizza