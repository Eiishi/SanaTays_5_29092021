let data = [];

fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((e) => data = e);
//----------------------------------------------------


setTimeout(() => {
//pour que la promesse de GET se fasse avant,
//et ainsi que l'array data soit rempli
//afin de pouvoir utiliser son contenu. 

    for (let i = 0; i < 8; i++) {
  

    // récupération des éléments du DOM dont besoin
    //----------------------------------------------------
    let items = document.getElementById("items");
    
    
    // création des balises
    //----------------------------------------------------
    let link = document.createElement("a");
    let article = document.createElement("article");
    let img = document.createElement("img");
    let productName = document.createElement("h3");
    let productDescription = document.createElement("p");

    
    // attribution des classes et attributs
    //----------------------------------------------------
    link.setAttribute("href", "./product.html?id=42");
    img.setAttribute("src", data[i].imageUrl);
    img.setAttribute("alt", data[i].altTxt);
    productName.classList.add("productName");
    productDescription.classList.add("productDescription");
    
    
    // hiérarchisation des balises
    //----------------------------------------------------
    items.appendChild(link);
    link.appendChild(article);
    article.appendChild(img);
    article.appendChild(productName);
    article.appendChild(productDescription);
    
    
    // remplissage des balises texte
    //----------------------------------------------------
    productName.textContent = data[i].name;
    productDescription.textContent = data[i].description;
    
    }
}, 500);