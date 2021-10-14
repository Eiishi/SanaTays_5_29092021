let data = [];
let idList = [];


// requête API
//----------------------------------------------------
fetch('http://localhost:3000/api/products')
.then((res) => res.json())
.then((e) => data = e)
.then( () => {
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
        
        
        // récupération des ID et placement dans l'URL page Produit
        //----------------------------------------------------
        const url = new URL('http://127.0.0.1:5500/front/product.html?id=42');
        const params = new URLSearchParams(url.search);
        params.set('id', data[i]._id);
        productId = params.get('id');
        
        
        // attribution des classes et attributs
        //----------------------------------------------------
        link.setAttribute("href", "./product.html?id=" + productId);
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


    // stockage des infos utiles
    //----------------------------------------------------
    for (let index = 0; index < 8; index++) {
        idList.push(data[index]._id);
    }

    localStorage.data = JSON.stringify(data);
    localStorage.idList = JSON.stringify(idList);

});