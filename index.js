const express = require('express'); // Importieren des Express-Frameworks
const app = express(); // Erstellen einer Express-App
const User = require('./controller/models/userModel')
const Team = require('./controller/models/teamModel')
const service = require('./controller/serviceController')
const router = express.Router();


  
 
  // app.get('/api/user', (req, res) => {
  //   User.findAll().then(user => {
  //     console.log(user);
  //     res.send(user);
  //   }).catch((err) => {
  //     console.error('Unable to query users:', err);
  //     res.sendStatus(500);
  //   });
  // });


//  Team.findAll().then((team)=>{
//     console.log(team);
//  });
  
//   User.findAll().then((user) => { // Abfragen aller Benutzer aus der Datenbank
//     console.log(user); //Ausgabe der Benutzer in Konsole
    
//   }).catch((err) => {
//     console.error('Unable to query users:', err);
//   });

module.exports = router; 

app.use('/', service);

app.listen(3000, () => { // Starten des Servers auf Port 3000
  console.log('Server started on port 3000'); // Ausgabe in der Konsole
});