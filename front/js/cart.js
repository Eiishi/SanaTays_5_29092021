let products = [];

// Récupération du localStorage
//----------------------------------------------------
const data = JSON.parse(localStorage.getItem("data"));
let cart = JSON.parse(localStorage.getItem("cart"));


// SNIPPET POUR LA PAGE CONFIRMATION
// affichage du n° de commande depuis l'URL actif
//----------------------------------------------------
if (document.querySelector("title").textContent === "Confirmation") {
    let orderId = document.getElementById("orderId");
    const paramsOrder = new URLSearchParams(location.search); 
    let idUrl = paramsOrder.get('id');
    orderId.textContent = idUrl;
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
            article.setAttribute("data-color", cart[i][2]);
            article.setAttribute("data-price", data[j].price);
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
            
            // Récupération de la couleur
            //----------------------------------------------------
            let dataColor = data[j].colors[article.dataset.color-1];
            
            // h2 nom & couleur du produit
            //----------------------------------------------------
            let h2 = document.createElement("h2");
            h2.textContent = data[j].name + " (" + dataColor + ")";
            cartItemContentTitlePrice.appendChild(h2);
            
            // p prix du produit
            //----------------------------------------------------
            let price = document.createElement("p");
            price.textContent = article.dataset.price + " €";
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
                totalQuantity.textContent = Number(totalQuantity.textContent) + Number(itemQuantity.value);
                totalPrice.textContent = Number(totalPrice.textContent) + (article.dataset.price)*Number(itemQuantity.value);
            } else {
                totalQuantity.textContent = Number(itemQuantity.value);
                totalPrice.textContent = (article.dataset.price)*Number(itemQuantity.value);
            }
            
            
            // Ajout de la modification pour la quantité
            //----------------------------------------------------
            itemQuantity.addEventListener("change", () => {
                totalQuantity.textContent = Number(totalQuantity.textContent) + Number(itemQuantity.value) - cart[i][1];
                totalPrice.textContent = Number(totalPrice.textContent) + article.dataset.price*(Number(itemQuantity.value) - cart[i][1]);
                cart[i][1] = Number(itemQuantity.value);
                localStorage.cart = JSON.stringify(cart);
            });
            
            
            // Suppression d'un produit du panier
            //----------------------------------------------------
            
            cartItemContentSettingsDelete.addEventListener("click", () => {
                
                for (let k = 0; k < cart.length; k++) {
                    
                    if (cart[k][0] == article.dataset.id && cart[k][2] == article.dataset.color) {
                        delete cart[k];
                        cart = cart.filter((a) => a);
                        document.getElementById("cart__items").removeChild(article);
                        localStorage.cart = JSON.stringify(cart);
                        
                        totalQuantity.textContent = Number(totalQuantity.textContent) - itemQuantity.value;
                        totalPrice.textContent = Number(totalPrice.textContent) - article.dataset.price*itemQuantity.value;
                        
                    }
                    
                }
                
            });
            products.push(article.dataset.id);
        }
    }
}


// VALIDATION ET ENVOI DU FORMULAIRE
// création de fonction de validation (regex)
// test sur l'user input
// remplit l'objet contact OU renvoie message d'erreur
//----------------------------------------------------
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};

// validation du prénom
// uniquement des lettres, tirets et espaces
//----------------------------------------------------

function validateLettersOnly(string) {
    return /^[a-zA-Z\-]+( [a-zA-Z]+)*$/i.test(string);
}

let firstName = document.getElementById("firstName");

firstName.addEventListener("change", () => {
    if (validateLettersOnly(firstName.value) == true) {
        contact.firstName = firstName.value;
        if (document.getElementById("firstNameErrorMsg")) {
            document.getElementById("firstNameErrorMsg").textContent = "";
        }
    } else {
        document.getElementById("firstNameErrorMsg").textContent = "Veuillez renseigner un prénom valide.";
    }
})


// validation du nom
// uniquement des lettres, tirets et espaces
//----------------------------------------------------

let lastName = document.getElementById("lastName");

lastName.addEventListener("change", () => {
    if (validateLettersOnly(lastName.value) == true) {
        contact.lastName = lastName.value;
        if (document.getElementById("lastNameErrorMsg")) {
            document.getElementById("lastNameErrorMsg").textContent = "";
        }
    } else {
        document.getElementById("lastNameErrorMsg").textContent = "Veuillez renseigner un nom valide.";
    }
})


// validation de l'adresse
// chiffres (sauf 0), lettres, tirets, espaces
//----------------------------------------------------

function validateAddress(address) {
    return /[1-9]?\d*\s[a-zA-Z\-]+/i.test(address);
}

let address = document.getElementById("address");

address.addEventListener("change", () => {
    if (validateAddress(address.value) == true) {
        contact.address = address.value;
        if (document.getElementById("addressErrorMsg")) {
            document.getElementById("addressErrorMsg").textContent = "";
        }
    } else {
        document.getElementById("addressErrorMsg").textContent = "Veuillez renseigner une adresse valide.";
    }
})


// validation de la ville
// uniquement des lettres, tirets et espaces
//----------------------------------------------------

let city = document.getElementById("city");

city.addEventListener("change", () => {
    if (validateLettersOnly(city.value) == true) {
        contact.city = city.value;
        if (document.getElementById("cityErrorMsg")) {
            document.getElementById("cityErrorMsg").textContent = "";
        }
    } else {
        document.getElementById("cityErrorMsg").textContent = "Veuillez renseigner un nom de ville valide.";
    }
})


// validation de l'adresse mail
// enchaînement de LCS + @ + LCS + . + LCS (LCS : lettres, chiffres, symboles)
//----------------------------------------------------

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

let email = document.getElementById("email");

email.addEventListener("change", () => {
    if (validateEmail(email.value) == true) {
        contact.email = email.value;
        if (document.getElementById("emailErrorMsg")) {
            document.getElementById("emailErrorMsg").textContent = "";
        }
    } else {
        document.getElementById("emailErrorMsg").textContent = "Veuillez renseigner une adresse mail valide.";
    }
})


// ENVOI DU FORMULAIRE A L'API VIA REQUÊTE POST
// au clic sur le bouton "Commander !"
// ----------------------------------------------------

let url = new URL('http://127.0.0.1:5500/front/html/confirmation.html?id=');
const params = new URLSearchParams(url.search);

let orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", (event) => {
    event.preventDefault();
        
    if (document.getElementById("firstNameErrorMsg").textContent == "" &&
        document.getElementById("lastNameErrorMsg").textContent == "" &&
        document.getElementById("addressErrorMsg").textContent == "" &&
        document.getElementById("cityErrorMsg").textContent == "" &&
        document.getElementById("emailErrorMsg").textContent == "" &&
        cart.length != 0) {
                    
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({contact, products})           
        })
        .then(res => res.json())
        .then(res => {
            params.set('id', res.orderId); 
            url = url + params.get('id');
            window.location.replace(url);
        })
        let cart = [];
        localStorage.cart = JSON.stringify(cart);
    } else if (cart.length == 0) {
        alert("Votre panier est vide !");
    }
})
