// récupération du local storage
// et de l'URL active
//----------------------------------------------------
const data = JSON.parse(localStorage.getItem("data"));
const idList = JSON.parse(localStorage.getItem("idList"));
const params = new URLSearchParams(location.search); 
let idUrl = params.get('id');
let cart = JSON.parse(localStorage.getItem("cart"));

for (let i = 0; i < 8; i++) {

    if (idUrl === idList[i]) {
        
        // MANIPULATIONS DU DOM
        // changement du <title>
        //----------------------------------------------------
        let title = document.querySelector("title");
        title.textContent = data[i].name;

        // image
        //----------------------------------------------------
        let img = document.createElement("img");
        img.setAttribute("src", data[i].imageUrl);
        img.setAttribute("alt", data[i].altTxt);
        document.querySelector("article > div").appendChild(img);

        // changement du <h1>
        //----------------------------------------------------
        let h1 = document.getElementById("title");
        h1.textContent = data[i].name;

        // changement du prix
        //----------------------------------------------------
        let price = document.getElementById("price");
        price.textContent = data[i].price;

        // changement de la description
        //----------------------------------------------------
        let productDescription = document.getElementById("description");
        productDescription.textContent = data[i].description;

        // ajout des options couleur
        //----------------------------------------------------
        let colors = data[i].colors;
        for (color in colors) {
            
            let colorChoice = document.createElement("option");
            colorChoice.setAttribute("value", colors[color]);
            colorChoice.textContent = colors[color];   
            document.getElementById("colors").appendChild(colorChoice);
            
        }            
            
            // ajout du produit au panier
            //----------------------------------------------------
            let quantity = document.getElementById("quantity");
            let addToCart = document.getElementById("addToCart");
            addToCart.addEventListener("click",() => {
                
                let colorSelected = JSON.stringify(document.getElementById("colors").options.selectedIndex);
                let quantityNumber = Number(quantity.value);
                let product = [];
                product.push(idUrl, quantityNumber, colorSelected);
                cart.push(product);
                for (j = 0; j < cart.length-1; j++) {
                    
                    if (product[0] === cart[j][0] && product[2] === cart[j][2]) {
                            cart.pop();
                            cart[j][1] = cart[j][1]+quantityNumber;
                        }

                }
                localStorage.cart = JSON.stringify(cart);
            });
    }
}