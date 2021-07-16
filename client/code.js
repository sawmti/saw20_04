async function getEntities() {
    const response = await fetch('/api/entities');
 //   const response = await fetch('/api/entidades_jp');
    const data = await response.json();
    return data
}

function fillEntities() {
    getEntities().then(data => {
        console.log(data.entities);
        const ulEntities = document.getElementById("ul_dinamico");

        data.entitiesQ.forEach(entity => {        
//        data.id.forEach(entity => {        
          const liEntity = document.createElement("ul");
          const text = document.createTextNode(entity);
          liEntity.appendChild(text);
          ulEntities.appendChild(liEntity);
        })
    })
}