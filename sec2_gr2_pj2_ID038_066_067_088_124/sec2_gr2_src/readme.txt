AppIGD Website
This website is a food and wellness website designed for general users. Especially, people who love health, food allergies or have underlying diseases and people who start cooking.

How to run the website
Web IGD 's Web service access instruction
you can run by open this project folder on Visual Studio Code( If you don't have this, I suggest to download it)
Start from...
1. Open Visual Studio Code
2. Click on 'File' Task bar and click 'Open folder...' 
3. click folder 'sec2_gr2_pj2_ID038_066_067_088_124' click on sec2_gr2_src and click open folder button
4. After that click 'Terminal' Task bar and click 'Open Terminal' 
5. After the terminal show type 'cd sec2_gr2_ws_src' to access our web service folder
6. you can select between open front-end or back-end Web server
-If you want to access front-end server...
1. type 'cd front-end' to access front-end folder
2. check package.json inside front-end folder and install necessary dependencies
3. From my experience, I emphasize you to download express dependencies by type 'npm install express'
4. After that the program will download this dependencies and add folder node_modules
5.then start the server by type 'npm start'
6.After that, when you want to access the website , you can type 'localhost:3000' on your web browser address bar to access to our website
-If you want to access back-end server...
1. type 'cd back-end' to access back-end folder
2. check package.json inside back-end folder and install necessary dependencies
3. From my experience, I emphasize you to download express-session dependencies by type 'npm install express-session'
4. After that the program will download this dependencies and add folder node_modules
5.Also download dotenv dependencies by type 'npm install dotenv' to link mysql and database
6. For .env file I suggest you to change username and password to match your identity and don't forget to add entry name 'sec2_gr2_database' in MySQL in User and Privileges section
7.then start the server by type 'npm start'
8.After that, when you want to access the website , you can type 'localhost:3030' on your web browser address bar to access to our website

Pages of AppIGD website
 Every page of AppIGD website need to run on the brower website. Moreover, each page can link to every page of website.

- Home page
  This is the first page of website that customer will see. In addition, This page can link to every page of this website by click on the name that you want to visit on the navigation and footer. For instance, when you click on the register, home page will go to register page that you selected.

- Product page/Search page
  - Product page
    This page shows about menu of AppIGD website by each menu is organized into different groups. For instance, Food patterns, nutrients, and other food constituents. Moreover, this page can link to search page automaticcally for the reson that this page is seperated  to two layers so first layer is search part and second layer is product page. Addtionally, this page has a page of each menu and each menu page link to every page on AppIGD website.

  - Search page
    This page is the same page with product page and then, this page is the first layer of product page. So, if you want to visit search page, you will meet product search at the same time. Although this page will have two sections in the same page, we have a function for seperate two section. For instance, when you select product page, my website will open product page but you can see search page too. Therefore, this page can link to other website and link to product page at the same time.

- Login page
  This page will input username and password but if the customer or developer not have account, this page can link to register page for register account. Moreover, this page can link in every page of website for the reason that it has navigation and footer which use for link to other pages.

- Register page
  This page will create new account for customer and developer. So,this page can link to other page in AppIGD website too.
 
- Account Management
  This page uses for input information of user. For instance, ProductNumber, Productname, Description, etc. Moreover, this page can link to other page.

- Product Management
  This page uses for input information of product. For instance, UserID, Username,Password, Tel, etc. Moreover, this page can link to other page.

- About us
  This page is about information of each member and this page has information page of each person. Moreover, this page can link to every page of websie and link to information pach of each person.