        // function to search for food using the Edamam API
        function searchFood() {
            // https://api.spoonacular.com is the web API that we use
            // this API requires an appID
            const apiKey = "4d24dca1c82148df87020002b5f07172";
            const searchQuery = document.querySelector("#search-input").value;
            const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchQuery}`;
          
            fetch(searchUrl)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                const outputDiv = document.querySelector("#search-output");
                outputDiv.innerHTML = "";
          
                for (let i = 0; i < data.results.length && i < 8; i++) {
                  const recipe = data.results[i];
                  const recipeName = recipe.title;
                  const recipeImage = recipe.image ? recipe.image : "https://via.placeholder.com/300x170.png?text=No+Image+Available";
                  const recipeId = recipe.id;
                  const recipeItem = document.createElement("div");
                  recipeItem.className = "box";
                  recipeItem.innerHTML = `
                    <img src="${recipeImage}" alt="${recipeName}" width="300" height="170" style="object-fit: cover;">
                    <h3>${recipeName}</h3>
                    <p>ID: ${recipeId}</p>
                  `;
                  outputDiv.appendChild(recipeItem);
                }
          
                outputDiv.style.display = "flex";
                outputDiv.style.flexWrap = "wrap";
                outputDiv.style.justifyContent = "space-between";
              })
              .catch((error) => {
                console.error(error);
                const outputDiv = document.querySelector("#search-output");
                outputDiv.innerHTML = "<p>Sorry, there was an error with your search.</p>";
              });
          }
          
          