const data = JSON.parse(localStorage.getItem("data"));
const idList = JSON.parse(localStorage.getItem("idList"));
const params = new URLSearchParams(location.search); 
let idUrl = params.get('id');

for (let i = 0; i < 8; i++) {

    if (idUrl === idList[i]) {

        
        // manipulation du DOM
        //-------------------------
        let title = document.querySelector("title");
        title.textContent = data[i].name;

        let img = document.createElement("img");
        img.setAttribute("src", data[i].imageUrl);
        img.setAttribute("alt", data[i].altTxt);
        document.querySelector("article > div").appendChild(img);

        let h1 = document.getElementById("title");
        h1.textContent = data[i].name;

        let price = document.getElementById("price");
        price.textContent = data[i].price;

        let productDescription = document.getElementById("description");
        productDescription.textContent = data[i].description;

        let colors = data[i].colors;
        for (color in colors) {

            let colorChoice = document.createElement("option");
            colorChoice.setAttribute("value", colors[color]);
            colorChoice.textContent = colors[color];   
            document.getElementById("colors").appendChild(colorChoice);
            
        }

    }
}