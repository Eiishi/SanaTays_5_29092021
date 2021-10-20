// Récupération du localStorage
//----------------------------------------------------
const data = JSON.parse(localStorage.getItem("data"));
let cart = JSON.parse(localStorage.getItem("cart"));

// Définition de la fonction somme
//----------------------------------------------------
const sum = () => {

}


// MANIPULATIONS DU DOM
// itération sur chaque élément du panier
// pour création + paramétrage des balises
//----------------------------------------------------

for (let i = 0; i < cart.length; i++) {


    // récupération de l'index du produit dans data
    //----------------------------------------------------

    for (j = 0; j < data.length; j++) {
        if (cart[i][0] === data[j]._id) {
        
        // article
        // ----------------------------------------------------
        let article = document.createElement("article");
        article.classList.add("cart__item");
        article.setAttribute("data-id", cart[i][0]);
        document.getElementById("cart__items").appendChild(article);
        
        // div item__img
        //----------------------------------------------------
        let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        article.appendChild(cartItemImg);
        
            // img
            //----------------------------------------------------
            let img = document.createElement("img");
            img.setAttribute("src", data[j].imageUrl);
            img.setAttribute("alt", data[j].altTxt);
            cartItemImg.appendChild(img);
            
            // div item__content
            //----------------------------------------------------
            let cartItemContent = document.createElement("div");
            cartItemContent.classList.add("cart__item__content");
            article.appendChild(cartItemContent);
            
            // div item__content__titlePrice
            //----------------------------------------------------
            let cartItemContentTitlePrice = document.createElement("div");
            cartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");
            cartItemContent.appendChild(cartItemContentTitlePrice);
            
            // h2 nom du produit
            //----------------------------------------------------
            let h2 = document.createElement("h2");
            h2.textContent = data[j].name;
            cartItemContentTitlePrice.appendChild(h2);
            
            // p prix du produit
            //----------------------------------------------------
            let price = document.createElement("p");
            price.textContent = data[j].price + " €";
            cartItemContentTitlePrice.appendChild(price);
            
            // div item__content__settings
            //----------------------------------------------------
            let cartItemContentSettings = document.createElement("div");
            cartItemContentSettings.classList.add("cart__item__content__settings");
            cartItemContent.appendChild(cartItemContentSettings);
            
            // div item__content__settings__quantity
            //----------------------------------------------------
            let cartItemContentSettingsQuantity = document.createElement("div");
            cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
            
            // p quantité du produit
            //----------------------------------------------------
            let quantity = document.createElement("p");
            quantity.textContent = "Qté : ";
            cartItemContentSettingsQuantity.appendChild(quantity);
            
            // input quantité du produit
            //----------------------------------------------------
            let itemQuantity = document.createElement("input");
            itemQuantity.setAttribute("type", "number");
            itemQuantity.classList.add("itemQuantity");
            itemQuantity.setAttribute("name", "itemQuantity");
            itemQuantity.setAttribute("min", 1);
            itemQuantity.setAttribute("max", 100);
            itemQuantity.setAttribute("value", cart[i][1]);
            cartItemContentSettingsQuantity.appendChild(itemQuantity);
            
            // div item__content__settings__delete
            //----------------------------------------------------
            let cartItemContentSettingsDelete = document.createElement("div");
            cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
            
            // p supprimer
            //----------------------------------------------------
            let deleteItem = document.createElement("p");
            deleteItem.textContent = "Supprimer";
            cartItemContentSettingsDelete.appendChild(deleteItem);

            // total articles et prix
            //----------------------------------------------------
            let totalQuantity = document.getElementById("totalQuantity");
            let totalPrice = document.getElementById("totalPrice");
            if (cart[i-1]) {
                totalQuantity.textContent = cart[i][1] + cart[i-1][1];
                totalPrice.textContent = Number(totalPrice.textContent) + (data[j].price)*cart[i][1];
            } else {
                totalQuantity.textContent = cart[i][1];
                totalPrice.textContent = (data[j].price)*cart[i][1];
            }


            
            // Ajout de la modification pour la quantité
            //----------------------------------------------------
            itemQuantity.addEventListener("change", () => {
                cart[i][1] = Number(itemQuantity.value);
                console.log(cart);
                localStorage.cart = JSON.stringify(cart);
            });
            
            
            // Suppression d'un produit du panier
            //----------------------------------------------------
            cartItemContentSettingsDelete.addEventListener("click", () => {
                document.getElementById("cart__items").removeChild(article);
                delete cart[i];
                cart = cart.filter((a) => a);
                localStorage.cart = JSON.stringify(cart);
            });
        }
    }
}
    
    