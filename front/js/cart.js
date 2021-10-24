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

// prénom
//----------------------------------------------------

function validateLettersOnly(string) {
    return /^[a-zA-Z\-]+$/i.test(string);
}

let firstName = document.getElementById("firstName").value;

if (validateLettersOnly(firstName) == true) {
    contact.firstName = firstName;
} else {
    document.getElementById("firstNameErrorMsg").textContent = "Veuillez renseigner un prénom valide.";
}


// nom
//----------------------------------------------------

let lastName = document.getElementById("lastName").value;

if (validateLettersOnly(lastName) == true) {
    contact.lastName = lastName;
} else {
    document.getElementById("lastNameErrorMsg").textContent = "Veuillez renseigner un nom valide.";
}


// adresse
//----------------------------------------------------

function validateAddress(address) {
    return /[1-9]\d*\s[a-zA-Z\-]+/i.test(address);
}

let address = document.getElementById("address").value;

if (validateAddress(address) == true) {
    contact.address = address;
} else {
    document.getElementById("addressErrorMsg").textContent = "Veuillez renseigner une adresse valide.";
}


// ville
//----------------------------------------------------

let city = document.getElementById("city").value;

if (validateLettersOnly(city) == true) {
    contact.city = city;
} else {
    document.getElementById("cityErrorMsg").textContent = "Veuillez renseigner un nom de ville valide.";
}


// email
//----------------------------------------------------

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

let email = document.getElementById("email").value;

if (validateEmail(email) == true) {
    contact.email = email;
} else {
    document.getElementById("emailErrorMsg").textContent = "Veuillez renseigner une adresse mail valide.";
}


// ENVOI DU FORMULAIRE A L'API VIA REQUÊTE POST
// au clic sur le bouton "Commander !"
// ----------------------------------------------------

let url = new URL('http://127.0.0.1:5500/front/html/confirmation.html?id=');
const params = new URLSearchParams(url.search);

let orderBtn = document.getElementById("order");
orderBtn.addEventListener("click", (event) => {
    event.preventDefault();
        
    if (contact.firstName != "" &&
        contact.lastName != "" &&
        contact.address != "" &&
        contact.city != "" &&
        contact.email != "") {
                    
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
        
    } else {
        
        document.getElementById("firstName").addEventListener("change", () => {
            if (validateLettersOnly(document.getElementById("firstName").value) == true) {
                contact.firstName = document.getElementById("firstName").value;
            }
        })
        document.getElementById("lastName").addEventListener("change", () => {
            if (validateLettersOnly(document.getElementById("lastName").value) == true) {
                contact.lastName = document.getElementById("lastName").value;
            }
        })
        document.getElementById("address").addEventListener("change", () => {
            if (validateAddress(document.getElementById("address").value) == true) {
                contact.address = document.getElementById("address").value;
            }
        })
        document.getElementById("city").addEventListener("change", () => {
            if (validateLettersOnly(document.getElementById("city").value) == true) {
                contact.city = document.getElementById("city").value;
            }
        })
        document.getElementById("email").addEventListener("change", () => {
            if (validateEmail(document.getElementById("email").value) == true) {
                contact.email = document.getElementById("email").value;
            }
        })
    }
})
