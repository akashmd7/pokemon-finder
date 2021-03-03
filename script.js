async function getapi(link) {
    const response = await fetch(link);
    var data = await response.json();
    show(data);
}

getapi("https://pokeapi.co/api/v2/type");


function show(data) {
    let drop1 = `<option>Pokemon Type 1</option>`;
    let drop2 = `<option>Pokemon Type 2</option>`;

    for (let r of data.results) {
        drop1 += `<option 
                value="${r.url}">${r.name}</option>`;
    }
    document.getElementById("type1").innerHTML = drop1;
    for (let r of data.results) {
        drop2 += `<option 
                value="${r.url}">${r.name}</option>`;
    }
    document.getElementById("type2").innerHTML = drop2;
}

async function showPokemons() {
    var result1 = document.getElementById("type1").value;
    var result2 = document.getElementById("type2").value;
    const response1 = await fetch(result1);
    var data1 = await response1.json();
    const response2 = await fetch(result2);
    var data2 = await response2.json();
    var table = ``
    for (let r of data1.pokemon) {
        var pokemonurl = r.pokemon.url;
        var p = getPokemon(pokemonurl);

        Promise.resolve(p).then(data => {
            if (data.id <= 200) {
                table += `<div id=${"row" + data.id.toString()}>
                <tr> 
                <td>${data.id}</td> 
                <td><img src="${data.sprites.front_default}"></td> 
                <td>${data.name}</td>
                <td>${data.base_experience}</td>
                <td>${data.weight}</td>
                <td>${data.height}</td></tr>
                </div>`;
                document.getElementById("tdata").innerHTML = table;
            }

        })

    }

    for (let r of data2.pokemon) {
        var pokemonurl = r.pokemon.url;
        var p = getPokemon(pokemonurl);

        Promise.resolve(p).then(data => {
            if (data.id <= 200) {
                table += `<div id=${"row" + data.id.toString()}>
                <tr> 
                <td>${data.id}</td> 
                <td><img src="${data.sprites.front_default}"></td> 
                <td>${data.name}</td>
                <td>${data.base_experience}</td>
                <td>${data.weight}</td>
                <td>${data.height}</td></tr>
                </div>`;
                document.getElementById("tdata").innerHTML = table;
            }
        })
    }
}


async function getPokemon(pokemonurl) {
    const response = await fetch(pokemonurl);
    var r = await response.json();
    return r;
}
