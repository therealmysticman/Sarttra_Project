const express = require('express');
const db = require('./database');

const router = express.Router();
//FOR POSTMAN TEST
//FOR PRODUCT SERVICES

// router.get /prod this will return all search result since there is no criteria
//Testing: No criteria search
//method: GET
//URL(use this for test): localhost:3030/prod , http://localhost:3030/prod
router.get('/prod', async (req, res) => {
    try {
        const [ProductData] = await db.promise().execute(
            `SELECT * FROM ProductInfomation`,
        );

        console.log(ProductData); // Log the merged data to the console
        return res.status(200).json({ error: false, data: ProductData, message: "Product successfully retrieved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving user data' });
    }
});

// router.get /prod/:id this will return all of product data that have matched input ID
//Testing: Criteria Search (Search By ID) : 1st criteria
//method: GET
//URL(use this for test): localhost:3030/prod/001 , http://localhost:3030/prod/001 , localhost:3030/prod/002 , http://localhost:3030/prod/002
router.get('/prod/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [ProductData] = await db.promise().execute(
            `SELECT * FROM ProductInfomation WHERE ProdID = ?`, [id]
        );
        console.log(ProductData); // Log the merged data to the console
        return res.status(200).json({ error: false, data: ProductData, message: "Product successfully retrieved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving user data' });
    }
});

// router.get /prod/nutrition/:nutrition this will return all of product data that have matched nutrition
//Testing: Criteria Search (Search By nutrition) : 2nd criteria
//method: GET
//URL(use this for test): localhost:3030/prod/nutrition/Protein , http://localhost:3030/prod/nutrition/Protein , localhost:3030/prod/nutrition/Starch , http://localhost:3030/prod/nutrition/Starch 
router.get('/prod/nutrition/:nutrition', async (req, res) => {
    try {
        const { nutrition } = req.params;
        const [ProductData] = await db.promise().execute(
            `SELECT * FROM ProductInfomation WHERE ProdNeutri = ?`, [nutrition]
        );
        console.log(ProductData); // Log the merged data to the console
        return res.status(200).json({ error: false, data: ProductData, message: "Product successfully retrieved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving user data' });
    }
});

// router.get /prod/type/:type this will return all of product data that have matched nutrition
//Testing: Criteria Search (Search By nutrition) : 2nd criteria
//method: GET
//URL(use this for test): localhost:3030/prod/type/Appertizer, http://localhost:3030/prod/type/Appertizer, localhost:3030/prod/type/Main Dish , http://localhost:3030/prod/type/Main Dish
router.get('/prod/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const [ProductData] = await db.promise().execute(
            `SELECT * FROM ProductInfomation WHERE ProdType = ?`, [type]
        );
        console.log(ProductData); // Log the merged data to the console
        return res.status(200).json({ error: false, data: ProductData, message: "Product successfully retrieved" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error retrieving user data' });
    }
});

// router.post /prod : this will add a new product data to the system
//Testing:  Insert a new product
//method: POST
//URL: localhost:3030/prod
//body: raw JSON
//Test case here:
//1st Test case:
//{
// "ProdID": "054",
// "ProdName": "Tom yum kung",
// "ProdType": "Main Dish",
// "ProdNeutri": "Fruit and vegetables",
// "ProdFactor": "Low calories",
// "ProdDesc" : " This hot and sour shrimp soup is an explosion of flavour and is also said to have medicinal properties ",
// "ProdRecipe": "15 shrimps or tiger prawns ,100g of mushroom ,600g of chicken stock ,1 tbsp chopped lemongrass ,1 tbsp chopped galangal ,3-4 kaffir lime leaves ,3-4 fresh red chillies, 5 tbsp fish sauce, 4 tbsp Lime Juice, 1 tbsp chilli oil, 1 tbsp chopped coriander",
// "ProdStep": "1.Clean the shrimp and remove the black thread (the intestine) from the shrimp by cutting it down the back. 2.Slice the galangal and lemongrass into short 3cm pieces and pound it in a mortar to break out the flavours. 3.Remove the stalk from the kaffir lime leaves and tear apart. 4.Put the chicken stock in a pan and bring to the boil. 5.When the water is boiling add the galangal, lemongrass, kaffir lime leaves and wait for it to come back to the boil. 6.Add the shrimps and cook for 2 minutes. 7.Break the chillies into a mortar and pound them for a few moments to a pulp then add to the soup. 8.Add the fish sauce, lime juice and chilli oil to the soup. 9.Turn off the heat and add the coriander leaves."
// } 
//2nd Test case:
//{
//"ProdID": "017",
//"ProdName": "Som Tam",
//"ProdType": "Main Dish",
//"ProdNeutri": "Fruit and vegetable",
//"ProdFactor": "Low calories",
//"ProdDesc" : " This hot and sour shrimp soup is an explosion of flavour and is also said to have medicinal properties ",
//"ProdRecipe": "1 large green papaya (or 2 small ones), 1 garlic clove ,Handful cherry tomatoes (halved) ,Handful peanuts (roasted or fried) ,5 snake/long beans or a handful of french beans, 1-2 Thai bird’s-eye chillies or one large red chilli if you don’t want it too spicy ,1 tbs fish sauce (or Thai light soy if you want it vegetarian) ,2 tbs tamarind juice ,2 limes squeezed (save the empty limes) ,1 tsp palm sugar dissolved in boiling water ,6-8 dried prawns (optional).",
//"ProdStep": "1.Peel the skin off the papaya, cut in half and scrape out the seeds. 2.Grate the papaya with a Julienne peeler or grater. 3.Mix all the wet ingredients in a bowl. The sauce should be sweet, sour and salty. 4.Pound the chilli and garlic in the pestle and mortar (or mixing bowl), then add the beans and dried prawns (if using prawns). Bruise and then add the papaya, tomatoes, and peanuts. 5.Pour in the sauce. 6.With a large spoon in one hand and the pestle in the other (this may take some practice), scoop and pound until everything is well combined and the juice of the tomatoes has made its way into the dressing. 7.Scoop onto a plate, making sure you get all that lovely dressing. 8.Serve with absolutely anything or just eat it on its own."
//}     
router.post('/prod', async (req, res) => {
    try {
        const { ProdID, ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep } = req.body; // Destructure the required fields from the request body

        // Insert a new row into the ProductInfomation table
        const [ProductData] = await db.promise().execute(
            `INSERT INTO ProductInfomation (ProdID, ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [ProdID, ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep]
        );

        return res.status(200).json({ error: false, message: "Product successfully inserted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error inserting product data' });
    }
});

// router.put /prod/:id : this will add a new product data to the system
//Testing:  update a new product data in required ID
//method: PUT
//URL: localhost:3030/prod/001 , localhost:3030/prod/002 , or localhost:3030/prod/003
//body: raw JSON
//Test case here:
//1st Test case:
//{
//"ProdName": "Spaghetti Carbonara",
//"ProdType": "Main Dish",
//"ProdNeutri": "Dairy",
//"ProdFactor": "Moderate calories",
//"ProdDesc" : " Pasta carbonara is an indulgent yet surprisingly simple recipe. Made with pancetta (or bacon) and plenty of Parmesan",
//"ProdRecipe": "1 tablespoon extra virgin olive oil or unsalted butter ,1/2 pound pancetta or thick cut bacon, diced ,1 to 2 garlic cloves, minced, about 1 teaspoon (optional) ,3 to 4 whole eggs ,1 cup grated Parmesan or pecorino cheese ,1 pound spaghetti (or bucatini or fettuccine),Kosher salt and freshly ground black pepper to taste", 
//"ProdStep": "1.Put a large pot of salted water on to boil (1 tablespoon salt for every 2 quarts of water.) 2.While the water is coming to a boil, heat the olive oil or butter in a large sauté pan over medium heat. Add the bacon or pancetta and cook slowly until crispy and add the garlic (if using) and cook another minute, then turn off the heat and put the pancetta and garlic into a large bowl 3.In a small bowl, beat the eggs and mix in about half of the cheese 4.Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil 5.When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon and garlic. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce. Toss everything to combine, allowing the pasta to cool just enough so that it doesn't make the eggs curdle when you mix them in. (That's the tricky part.). 6.Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out 7.Serve at once with the rest of the parmesan and freshly ground black pepper. If you want, sprinkle with a little fresh chopped parsley."
//}
//2nd Test case:
//{
//"ProdName": "Seared Salmon With Charred Green Beans",
//"ProdType": "Main Dish",
//"ProdNeutri": "Protein",
//"ProdFactor":  "low calories",
//"ProdDesc" : " Seared Salmon With Charred Green Beans is food that is easy to make  Complete nutritional value  It is a food that even people who lose weight can eat and it tastes so good that unlike healthy food by just have salmon, green beans, garlic, capers and red chile. That's it!",
//"ProdRecipe": "2 Tbsp. plus 2 tsp. olive oil, divided, 1 1/4 lb. skinless salmon fillet, cut into 4 portions,1 lb. green beans, trimmed, Kosher salt and pepper,4 cloves garlic, smashed and thinly sliced,1 small red chile, thinly sliced,2 tbsp. capers, drained, patted dry,Lemon wedges, for serving",
//"ProdStep": "1. Heat 2 teaspoons oil in a large skillet on medium-high. Season salmon with ½ teaspoon each salt and pepper, add to skillet, flesh side down, reduce heat to medium, and cook until golden brown and just opaque throughout, 5 to 6 minutes per side.  2. Heat remaining 2 tablespoons oil in a large cast-iron skillet on medium-high. Add green beans and cook until browned, 2½ minutes. Turn with tongs and cook until browned and just barely tender, about 3 minutes more.  3. Remove from heat and toss with ¼ teaspoon salt, then garlic, chile, and capers. Return to medium heat and cook, tossing until garlic is golden brown, 1 to 2 minutes. Serve with salmon and lemon wedges if desired."
//}
router.put('/prod/:id', async (req, res) => {
    try {
        const { ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep } = req.body; // Destructure the required fields from the request body
        const { id } = req.params; // Get the product ID from the request params

        // Update the row in the ProductInfomation table with the given ID
        const [ProductData] = await db.promise().execute(
            `UPDATE ProductInfomation SET ProdName = ?, ProdType = ?, ProdNeutri = ?, ProdFactor = ?, ProdDesc = ?, ProdRecipe = ?, ProdStep = ? WHERE ProdID = ?`,
            [ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep, id]
        );

        return res.status(200).json({ error: false, message: "Product successfully updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Error updating product data' });
    }
});

// router.delete /prod/:id : this will delete a product data that matched required ID in the system
//Testing:  delete a product data in required ID
//method: DELETE
//URL: localhost:3030/prod/001, localhost:3030/prod/005 , or localhost:3030/prod/003
router.delete('/prod/:id', (req, res) => {
        const { id } = req.params;
        db.query(`DELETE FROM ProductInfomation WHERE ProdID = ?`, [id], (err, result1) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: true, message: 'Error deleting product data' });
            }

            // If both deletes were successful, send a success response
            if (result1.affectedRows > 0) {
                return res.status(200).json({ error: false, message: "Product successfully deleted" });
            } else {
                return res.status(404).json({ error: true, message: "Product not found" });
            }

        });
});

//FOR POSTMAN TEST END HERE
module.exports = router;