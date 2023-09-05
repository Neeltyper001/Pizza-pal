document.getElementById('show-cart-section-btn').addEventListener('click',showMyCart);
document.getElementById('close-cart-section-btn').addEventListener('click',closeMyCart);

function showMyCart(){
    document.querySelector('.cart-section').style.visibility = 'visible';    
}

function closeMyCart(){
    document.querySelector('.cart-section').style.visibility = 'hidden';
}