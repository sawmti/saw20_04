async function getEntities() {
    const response = await fetch('/api/entidades');
 //   const response = await fetch('/api/entidades_jp');
    const data = await response.json();
    console.log(data);
    return data
}

function fillEntities() {
    getEntities().then(data => {
        const ulEntities = document.getElementById("ul_dinamico");
        console.log(ulEntities);

        data.entitiesQ.forEach(entity => {        
//        data.id.forEach(entity => {        
          const liEntity = document.createElement("ul");
          const text = document.createTextNode(entity);
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}




