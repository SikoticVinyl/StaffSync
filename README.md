# Tracker

An employee database manager in a command line application.

## Description

This project was a wonderful way to really dig into creating a database that functions, connects and works together while also beginning to connect a level of ui into it. I had a ton of fun building out the database and blew through it, and while going through and creating each of the update options was a big repetitive in some ways in others it was refreshing to figure out and work out the different ways to handle and complete things.

While working on this project I kept getting a ton of new ideas for different improvements I could make to the UI. I formatted the menu a bit more so it is easy to read and have some psuedo coding built in with the starts of a mini menu organization setup. I feel like overall this project really solidified my comfortablility and knowledge with inquire and mysql as a databse and I am excited to see where this knowledge takes me.

## Installation

To be able to use this project, as it is not hosted anywhere you will first need to clone the repo from github and then make sure you get the proper dependancies. 

To install and run this project locally, follow these steps:

### Clone the Repository

To clone the repository, use the following command in your terminal or command prompt:

```bash
git clone https://github.com/SikoticVinyl/Tracker.git
```

Once cloned, change your current directory to the project folder using the cd command:

```bash
cd your_path/your-repository
```

Then install the necessary dependencies by running the following command (assuming you have Node.js and npm installed):

```bash
npm install
```

You will also need to source the database, access your MySQL command line interface and source the database schema by executing the following command:

```bash
mysql -u your_username -p
SOURCE db/schema.sql #Adjust this document to meet your database table needs
SOURCE db/seeds.ql #If you want to use the example seed data provided
```

Replace your_username with your MySQL username, use -p if you have a password, and make sure to provide the correct path to schema.sql.

Finally, you can start the application by executing the following command:

```bash
npm start
```

## Usage

Please see this video for an example walktrhough on how the app interacts and can be used: https://www.youtube.com/watch?v=AaP761G2mr8