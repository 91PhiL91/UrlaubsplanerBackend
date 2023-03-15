const express = require('express'); // Importieren des Express-Frameworks
const app = express(); // Erstellen einer Express-App
const service = require('./controller/serviceController')
const router = express.Router();
const bodyParser = require('body-parser');

//importieren  body-parser und fügen dann die Middleware-Funktionen urlencoded und json von body-parser hinzu, um die Verarbeitung von Anforderungen mit URL-codiertem und JSON-Inhalt zu ermöglichen. Der Aufruf von app.use() fügt die Middleware zur Express-Anwendung hinzu.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', service);



module.exports = router; 

app.listen(3000, () => { // Starten des Servers auf Port 3000
  console.log('Server started on port 3000'); // Ausgabe in der Konsole
});
