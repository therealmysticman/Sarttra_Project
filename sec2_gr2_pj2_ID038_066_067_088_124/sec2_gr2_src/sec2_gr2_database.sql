drop database if exists	sec2_gr2_database;

create database if not exists sec2_gr2_database;
use sec2_gr2_database;

create table if not exists AdminInformation(
AdminID 	char(7) primary key,
AdminFname 	varchar(50) not null,
AdminLname 	varchar(50) not null,
AdminNname 	varchar(25) not null,
AdminEmail 	varchar(25) not null,
AdminPhone 	varchar(12) not null
);

create table if not exists AdminLogin(
ID_Admin	char(7),
AdminUser 	varchar(50) primary key,
AdminPass 	varchar(50) not null,
AdminRole 	varchar(25),
LoginLog 	timestamp,
constraint FK_AdminInLog	foreign key(ID_Admin) references AdminInformation(AdminID));

create table if not exists ProductInfomation(
ProdID 		char(3) primary key,
ProdName 	varchar(50) not null,
ProdType 	varchar(25),
ProdNeutri 	varchar(25),
ProdFactor 	varchar(25),
ProdDesc	text,
ProdRecipe 	Text,
ProdStep 	Text
);

insert into AdminInformation(AdminID, AdminFname, AdminLname, AdminNname, AdminEmail, AdminPhone) value
('6488038', 'Kanyavee', 'Likitwattanakij', 'Babe', 'Kanyavee@gmail.com', '066-468-2969'),
('6488124','Sarttra','Parsongtichol','Blue','Sarttra@gmail.com','088-673-5591'),
('6488067','Tanawat','Raweepachwarathon','Pleum','Tanawat@gmail.com','092-625-2924'),
('6488066','Arada','Raksapatcharawong','Aida','Arada@gmail.com','000-000-0000'),
('6488088','Ittikorn','Suksai','Nop','Ittikorn@gmail.com','098-584-5035'),
('6666666','Kirin','Elderdragon','Kirin','Kirinza007@gmail.com','111-111-1111');

insert into AdminLogin(ID_Admin,AdminUser, AdminPass, AdminRole) value
('6488038','Kanyaveeza', '2468102', 'Web developer'),
('6488124','SarttraYipPree','2002Eulb!','Web developer'),
('6488067','TanawatNamTaaKabao','666999666','Web developer'),
('6488066','AradaAbsent','6600660066','Web designer'),
('6488088','IttikornSukPaiLaeu','8800880088','Web developer'),
('6666666','KirinAha','11100111','Mascot');

insert into ProductInfomation(ProdID, ProdName, ProdType, ProdNeutri, ProdFactor, ProdDesc, ProdRecipe, ProdStep) value
('001', 'Grilled sea bass with miso sauce', 'Main dish', 'Protein', null, 
"It's a healthy food menu. Help nourish the bones. Can help strengthen and relieve rheumatoid arthritis. Reduces high blood pressure",
"Sea bass fillet (cut into pieces) 300 g., Miso 80 g, Mirin 1 tbsp ,1 egg (yolk only), Vegetable oil, grated radish, to Japanese steamed rice",
"1.Pour the miso and mirin into a pan over low heat, stir until the consistency, add the egg yolks and stir until homogeneous. Set aside. 2.set fire to grill. Spread vegetable oil over the sieve. Apply miso sauce (as in step 1) over the sea bass. 3.Grilled over low heat until
cooked. Served with grated radish. and Japanese steamed rice"),

('002', 'Clear soup with omlete','Appertizer','Starch', 'Low calories',
"It's easy to eat. Suitable for everyone, especially those who want to control their diet",
"2-3 eggs, onions, spring onions, coriander, seasoning powder, fish sauce, soy sauce, sugar, water",
"1.Slice spring onions and onions into small pieces. 2.Crack an egg into a bowl, add sliced onions,spring onions and a little fish sauce
3.Heat the pan, add a little oil when the oil is hot, pour the eggs into the pan and fry until the eggsstart to cook on both sides.Use a spatula to cut the eggs into pieces. 4.Fill it with water. Season with sugar,
soy sauce, seasoning powder, and finally add the remaining springonions.Turn off the stove and sprinkle with coriander leaves."),

('003','Spicy mixed vegetable soup', 'Main dish', 'Fruit and vegetable', 'Low calories', 
"Mixed vegetable soup is a traditional Thai dish. It focuses more on vegetables than meat and is healthy for everyone.",
"1+1/2 tsp black pepper, Fingerroot 1-2 stems ,3-4 shallots, Shrimp paste 1 teaspoon, 1/3 cup finely ground dried shrimp, 3 cups chicken broth, Chinese okra, cut into bite-sized pieces 150 g, Pumpkin, cut
into bite-sized pieces 200 g, Courgette, cut into bite size pieces 150 g, Baby corn, sliced 150 g, 150 g of champignon Mushrooms, 200 g of fresh shrimp, basil 80 g, fish sauce",
"1.Prepare the curry paste first. 2.Pound the pepper with the Krachai, then add the shallots, pound thoroughly, followed by the shrimp paste, pound together, then add the ground dried shrimp, pound together again until thoroughly.
3.Put the chicken broth in the pot. Bring to a boil and add curry paste. 4.When the soup is boiling, add vegetables that are difficult to cook first. Bring to a boil again then add the rest of the vegetables.
5.Once the water is boiling add the chinese okra, pumpkin, courgette and mushrooms. 6.When the soup is boiling again, add fresh shrimp. Season with fish sauce as desired. 7.When the mixture boils again, 
add the basil leaves. scoop served hot."),

('004', 'Boiled rice with grouper', 'Appertizer', 'Protein', 'Low calories',
"It's a food that's easy to digest, not sticky. Beneficial to the body. Can be eaten by all genders, ages, suitable for patients.",
"Pork bone broth 1,200 ml, Young galangal, thinly sliced 3 tbsp., Shiitake mushrooms (soaked in water until soft) 100 g, 4 tablespoons soy sauce, 1 tablespoon sugar, 2 teaspoons ground pepper, Grouper fillet (cut into pieces, boiled)
10 pieces., 300 g cooked jasmine rice., Finely chopped galangal, Braised leeks, Chopped celery",
"1.Boil pork bone broth with young galangal until boiling, add shiitake mushrooms, season with light soy sauce,
sugar and ground pepper, reduce heat and simmer until boiling broth. 2.Set aside. 3.Heat the water in another pot until it boils. Add jasmine rice to cook in boiling water until soft, scoop into a bowl, and
place blanched grouper. 4.Put the pork bone broth. sprinkle finely pounded galangal, fried garlic, and celery. Eat while hot with soybean sauce."),

('005', 'Spicy chicken soup with mushroom', 'Appertizer', 'Protein', 'Low calories',
"A healthy, nutritious soup is suitable for all ages. It has many benefits and does not cause obesity",
"Tom Yum soup consists of galangal, lemongrass, kaffir lime leaves, shallots (peeled) 4-5 heads, Bird's Eye Chilli, Straw Mushroom, Grape Tomatoes, 1 tablespoon wet tamarind, 1+1/2 tbsp fish sauce ,lemon, thinly sliced, chicken breast, parsley",
"1.Boil water 2.Put the Tom Yum ingredients, the galangal is pounded before putting it in. Do not add too much. 3.Smash the lemongrass and cut it into small pieces, put it in until fragrant. 4.Followed by shallots and tomatoes. 5. When everything falls into place, add the sliced chicken breast,
wait until cooked, then add the mushrooms.6.Season with tamarind juice and fish sauce. 6.Remove the pot from the stove. 7.Then tear kaffir lime leaves and sprinkle them on top. 8.Add crushed bird's eye chili to increase the spiciness. and 
sprinkle parsley and add seasoning to your liking");
