const loadCategies=()=>{
    fetch(`https://openapi.programming-hero.com/api/videos/categories`)
    .then(res=>res.json())
    .then(data=>displyCategories(data.data))
}
const displyCategories=(data)=>{
    console.log(data);
    const allCategory = document.getElementById("allCategory");
    allCategory.innerHTML="";
    data.forEach(category => {
        console.log(category);
        const div = document.createElement("div");
        div.innerHTML = `
        <button class="btn glass">${category.category}</button>
        `;
        allCategory.appendChild(div);
    })
}

loadCategies();