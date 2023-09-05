import {URL} from '../utils/config.js'
import makeNetworkCall from './api-client.js';
import Pizza from '../models/pizza-model.js';

const pizzaOperations = {
    pizzas:[],
    total_amount: 0,
        searchPizza(pizzaId){
        const pizzaObject = this.pizzas.find(pizza=>pizza.id == pizzaId);
        return pizzaObject;
        },

        setToCart(pizzaId){
        const pizzaObject = this.searchPizza(pizzaId);
        pizzaObject.isAddedInCart = true;
        pizzaObject.quantity++;
        this.total_amount += parseFloat(pizzaObject.price);
        },
        
     /*async*/ setPizzas(){
        
        // const data = await makeNetworkCall(URL);  
        const data = makeNetworkCall();           
        const pizzaJSON = data['Vegetarian']
            // Data Map to Model    
        const pizzas = pizzaJSON.map(singlePizza =>{
            const pizzaObject = new Pizza(singlePizza.id , singlePizza.name, singlePizza.price, singlePizza.assets.product_details_page[0].url,singlePizza.menu_description)            
            return pizzaObject
        })      
        this.pizzas = pizzas;              
    },

     getPizzas(){
        return this.pizzas;
    },

     reducePizza(pizzaId){
        const pizzaObject = this.searchPizza(pizzaId);         
        if(pizzaObject.quantity>0){
            pizzaObject.quantity--;
            this.total_amount -= parseFloat(pizzaObject.price);
        }
        if(pizzaObject.quantity == 0){
            pizzaObject.isAddedInCart = false;
        }
    },

    removeFromCart(pizzaId){
        const pizzaObject = this.searchPizza(pizzaId);
        pizzaObject.isAddedInCart = false;
        pizzaObject.quantity = 0;
        this.total_amount -= parseFloat(pizzaObject.price);
    },

    emptyCart(){
        this.pizzas.forEach(pizza=>{
            pizza.isAddedInCart = false;
            pizza.quantity = 0;
        })
        this.total_amount = 0;
    },

    isEmptyCart(){
        const pizzasInCart = this.pizzas.filter(pizza=>pizza.isAddedInCart === true);
        return pizzasInCart.length == 0;
    }
}


export default pizzaOperations;