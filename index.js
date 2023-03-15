const express = require('express'); // Importieren des Express-Frameworks
const app = express(); // Erstellen einer Express-App
const User = require('./controller/models/userModel')

const Sequelize = require('sequelize');
const sequelize = new Sequelize('sqlite:./database/UrlaubsplanerDatenbank.db',  { 
  host: 'localhost',
  port: '3000',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
 // storage: 'sqlite:./Urlaubsplaner'
});



  
  User.findAll().then((user) => { // Abfragen aller Benutzer aus der Datenbank
    console.log(user); // Ausgabe des ersten Benutzers als JSON
  }).catch((err) => {
    console.error('Unable to query users:', err);
  });




app.listen(3000, () => { // Starten des Servers auf Port 3000
  console.log('Server started on port 3000'); // Ausgabe in der Konsole
});