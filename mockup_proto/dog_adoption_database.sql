drop database if exists	dog_adoption_database;

create database if not exists dog_adoption_database;
use dog_adoption_database;

create table if not exists UserInformation(
UserID 	char(7) primary key,
UserFname 	varchar(50) not null,
UserLname 	varchar(50) not null,
UserNname 	varchar(25) not null,
UserEmail 	varchar(25) not null,
UserPhone 	varchar(12) not null,
UserCitizenID 	varchar(13) not null,
UserBirthdate 	date not null,
UserAddress varchar(100) not null
);

create table if not exists UserLogin(
ID_User	char(7),
UserUsername 	varchar(50) primary key,
UserPass 	varchar(50) not null,

constraint FK_UserInLog	foreign key(ID_User) references UserInformation(UserID));

create table if not exists CompanyInformation(
CompanyID 	char(7) primary key,
CompanyName 	varchar(25) not null,
CompanyEmail 	varchar(25) not null,
CompanyPhone 	varchar(12) not null,
CompanyAddress varchar(100) not null
);

create table if not exists CompanyLogin(
ID_Company	char(7),
CompanyUser	varchar(50) primary key,
CompanyPass 	varchar(50) not null,

constraint FK_CompanyInLog foreign key(ID_Company) references CompanyInformation(CompanyID));

insert into UserInformation(UserID, UserFname, UserLname, UserNname,UserEmail, UserPhone,UserCitizenID,UserBirthdate,UserAddress) value
('6488038', 'Kanyavee', 'Likitwattanakij', 'Babe', 'Kanyavee@gmail.com', '066-468-2969',4205612389945,'2002-09-23','Bangkok'),
('6488124','Sarttra','Parsongtichol','Blue','Sarttra@gmail.com','088-673-5591','1214569965327','2003-06-15','Nonthaburi'),
('6488067','Tanawat','Raweepachwarathon','Pleum','Tanawat@gmail.com','092-625-2924','3256989855342','2003-02-10','Bangkok'),
('6488066','Arada','Raksapatcharawong','Aida','Arada@gmail.com','000-000-0000','3256998554421','2002-09-10','Nonthaburi'),
('6488088','Ittikorn','Suksai','Nop','Ittikorn@gmail.com','098-584-5035','4206923056113','2003-04-16','Bangkok'),
('6666666','Kirin','Elderdragon','Kirin','Kirinza007@gmail.com','111-111-1111','1103623056113','2001-04-29','Nonthaburi');

insert into UserLogin(ID_User,UserUsername, UserPass) value
('6488038','Kanyaveeza', '2468102'),
('6488124','SarttraYipPree','2002Eulb!'),
('6488067','TanawatNamTaaKabao','666999666'),
('6488066','AradaAbsent','6600660066'),
('6488088','IttikornSukPaiLaeu','8800880088'),
('6666666','KirinAha','11100111');

insert into CompanyInformation(CompanyID,CompanyName,CompanyEmail,CompanyPhone,CompanyAddress) value
('445688', 'RoyalGuard', 'royalinc@gmail.com','061-556-2388','Kanchanaburi'),
('124568', 'SmartFinger', 'smartfing@gmail.com','081-234-2388','Nonthaburi'),
('6255898', 'PetFarenheit', 'farentpet@gmail.com','093-289-3421','Nonthaburi');

insert into CompanyLogin(ID_Company,CompanyUser, CompanyPass) value
('445688','RoyalGuard56', '2468102'),
('124568','Smart_5','2002Eulb?'),
('6255898','F54Pet','12345678');
