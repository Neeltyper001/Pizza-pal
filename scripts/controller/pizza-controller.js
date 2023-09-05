import pizzaOperations from "../services/pizza-operations.js";
/*async*/ function printPizzas(){
    // await pizzaOperations.setPizzas();
    pizzaOperations.setPizzas();
    const allPizzas = pizzaOperations.getPizzas();
    const div = document.getElementById('pizza-output')    
    for(var pizza of allPizzas){
     const card =  createCard(pizza)
     div.appendChild(card);
    }
}

printPizzas();


function printBasket(){

    if(pizzaOperations.isEmptyCart()){
        const basketDiv = document.getElementById('basket-output');
        basketDiv.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src="./assets/Images/cart.jpeg" class="card-img-top" alt="">
                    <div class="card-body">
                        <h3 class="card-text text-center">Empty Cart</h3>
                    </div>
            </div>
        `;
        return;
    }
    else{
        const basketDiv = document.getElementById('basket-output');
        basketDiv.innerHTML = '';
        const pizzasInCart = pizzaOperations.pizzas.filter(pizza=>pizza.isAddedInCart === true);
               
        pizzasInCart.forEach(pizza => {
            basketDiv.appendChild(printItem(pizza));
        });
    }
    
}

function printItem(pizza){
const colDiv = document.createElement('div');
    colDiv.style.width = '18rem';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    colDiv.appendChild(cardDiv);
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title'
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);
    cardDiv.appendChild(cardBody);
    const quantity = document.createElement('span');
    quantity.className = 'card-text'
    quantity.innerText = `Quantity : ${pizza.quantity}`
    cardBody.appendChild(quantity);

    const reduce = document.createElement('span');
    reduce.className = 'btn btn-danger ms-4 py-0 px-1 align-middle'
    reduce.innerText =  '-'
    reduce.setAttribute('pizza-id',pizza.id)
    reduce.addEventListener('click',reduceFromCart)
    cardBody.appendChild(reduce);
    const price = document.createElement('h5');
    price.className = 'card-text'
    price.innerText = `Price : ${(pizza.quantity*pizza.price).toFixed(2)}`
    cardBody.appendChild(price);
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.setAttribute('pizza-id',pizza.id)
    button.innerText = 'Remove';
    button.addEventListener('click',removeFromCart)
    cardBody.appendChild(button)    
    return colDiv;
    
}



function createCard(pizza){
    const colDiv = document.createElement('div');
    colDiv.className = 'col-xxl-4 col-xl-6 col-8 ';

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card shadow-sm p-3 mb-5 bg-body-tertiary rounded';
    cardDiv.style='width: 18rem;'
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    colDiv.appendChild(cardDiv);
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title'
    h5.innerText = pizza.name;
    cardBody.appendChild(h5);
    cardDiv.appendChild(cardBody);
    const pTag = document.createElement('p');
    pTag.className = 'card-text'
    pTag.innerText = pizza.desc;
    cardBody.appendChild(pTag);
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.setAttribute('pizza-id',pizza.id)
    button.innerText = 'Add to Cart';
    button.addEventListener('click',addToCart)
    cardBody.appendChild(button)    
    return colDiv;
    
}

function addToCart(){
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('pizza-id')
    pizzaOperations.setToCart(pizzaId);
    printBasket();
    updateTotalAmount();
}

function reduceFromCart(){
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('pizza-id')
    pizzaId
    console.log('Pizza id',pizzaId)
    pizzaOperations.reducePizza(pizzaId);
    printBasket();
    updateTotalAmount();
}

function removeFromCart(){
    const currentButton = this;
    const pizzaId = currentButton.getAttribute('pizza-id')
    pizzaId
    console.log('Pizza id',pizzaId)
    pizzaOperations.removeFromCart(pizzaId);
    printBasket();
    updateTotalAmount();
}

document.getElementById('emptyCartId').addEventListener('click',emptyTheCart);

function emptyTheCart(){ 
    if(pizzaOperations.isEmptyCart()){
        alert('Cart is already empty');
        return;
    }

    else if(confirm('Are you sure you want to empty the cart?') === true){
        pizzaOperations.emptyCart();
        printBasket();
        updateTotalAmount();   
    }
}

function updateTotalAmount(){
    const totalAmount = document.getElementById('totalAmount');        
    totalAmount.innerText = `Total Amount : Rs. ${(pizzaOperations.total_amount).toFixed(2)}`;
}
