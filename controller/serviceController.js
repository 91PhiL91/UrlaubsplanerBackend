const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const Team = require('./models/teamModel');
const Vacation = require('./models/vacationModel');
const Role = require('./models/roleModel');
const UserRole = require('./models/userRoleModel');
const authHelper = require("../helper/authHelper");
const { v4: uuidv4 } = require('uuid');
const { hashPassword } = require('../helper/hashHelper');
const bcrypt = require('bcrypt');


/*------------------------------------TEST-API/---------------------------------------------------------*/


// router.get('/api/user', async (req, res) => {
//   var users = await User.findAll().then(users => {
//     console.log(users);
//     res.send({ users });
//   }).catch((err) => {
//     console.error('Unable to query users:', err);
//     res.sendStatus(500);
//   });
// });


// router.get('/api/team', async (req, res) => {
//   var teams = await Team.findAll().then(teams => {
//     console.log(teams);
//     res.send({ teams });
//   }).catch((err) => {
//     console.error('Unable to query users:', err);
//     res.sendStatus(500);
//   });
// });





/* -------------------------------------------------------------------API/USERDETAIL------------------------------------------------------------------------------------*/

//Postman --> http://localhost:3000/api/userDetail?email=test@mail.de&password=1234

/*---Login Ablgeich---*/
router.get('/api/UserDetail', async (req, res) => {
  try {
    const email = req.query.email;
    const password = req.query.password;
    const user = await User.findOne({ where: { email } });

    if (user) {
      const hashedPassword = user.password;

      const passwordMatch = await comparePassword(password, hashedPassword);

      if (passwordMatch) {
        const token = jwt.sign(
          { user_id: email },
          "secret",
          {
            expiresIn: "900000ms",
          }
        );
        user.token = token;
        res.send({ userID: user.userID, token });
      } else {
        res.status(401).send('Falsches Passwort');
      }
    } else {
      res.status(404).send('Benutzer nicht gefunden');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Ein Fehler ist aufgetreten');
  }
});

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}




/*------- ohne Fehler Handling---------
router.get('/api/userDetail', async (req, res) => {
  const email = req.query.email;
  const password = req.query.password;

  const user = await User.findOne({ where: { email } });

  if (user) {
    const hashedPassword = user.password;

    const passwordMatch = await comparePassword(password, hashedPassword);

    if (passwordMatch) {
      const token = jwt.sign(
        { user_id: email },
        "secret",
        {
          expiresIn: "900000ms",
        }
      );
      user.token = token;
      res.send({ userID: user.userID, token });
    } else {
      res.status(401).send('Falsches Passwort');
    }
  } else {
    res.status(404).send('Benutzer nicht gefunden');
  }
});

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

------*/


/* -------------------------------------------------------------------API/User------------------------------------------------------------------------------------*/



/*---CreateNew User in DB--- */
router.post('/api/User', async (req, res) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    console.log("Das ist das gehaste Passwort : ", hashedPassword);

  
    await User.sync();
    const newUser = User.build({
      userID: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      totalVacation: req.body.totalVacation,
      restVacation: req.body.restVacation,
      plannedVacation: req.body.plannedVacation,
      takedVacation: req.body.takedVacation,
      note: req.body.note,
      teamID: req.body.teamID
    });

    console.log("Hash Password nach user hinzufügen ", hashedPassword);

    await newUser.save();
    console.log('User wurde gespeichert.');
    res.send(newUser);
  } catch (error) {
    console.error(error);
    res.send({ error }); // noch erweitern wenn nötig
  }
});


/*--- Update User in DB---*/
router.put('/api/User', async (req, res) => {
  try {
  // Überprüfen, ob die angegebene teamId in der Team Tabelle vorhanden ist

  if(req.body.teamId){
  const team = await Team.findByPk(req.body.teamID);
  if (!team) {
  res.status(400).send('Ungültige teamId');
  return;
  }
  }
  console.log(req.body);
  //Aktualisiere den User mit den angegebenen Werten
  await User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    //Password in extra Route??
    email: req.body.email,
    role: req.body.role,
    totalVacation: req.body.totalVacation,
    restVacation: req.body.restVacation,
    plannedVacation: req.body.plannedVacation,
    takedVacation: req.body.takedVacation,
    note: req.body.note,
    teamID: req.body.teamID
  },
  { where: { userID: req.body.userID } });

  console.log("Benutzer aktualisiert");
  res.status("200").send('OK');
} catch (error) {
  console.error(error);
  res.send({ error });
  }
  });


/*--------------------------ohne Fehler Handling
router.post('/api/User', async (req, res) => {

  const hashedPassword = await hashPassword(req.body.password);

  console.log("Das ist das gehaste Passwort : ", hashedPassword);

  console.log("POST auf /api/user");
  User.sync().then(() => {

    const newUser = User.build({
      userID: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
      email: req.body.email,
      role: req.body.role,
      totalVacation: req.body.totalVacation,
      restVacation: req.body.restVacation,
      plannedVacation: req.body.plannedVacation,
      takedVacation: req.body.takedVacation,
      note: req.body.note,
      teamID: req.body.teamID
    })



    console.log("Hash Password nach user hinzufügen ", hashedPassword);
   
    newUser.save()
      .then(() => {
        console.log('User wurde gespeichert.');
        res.send(newUser);

      })
      .catch((error) => {
        console.error(error);
        res.send({ error });
      });

    //Zur Kontrolle
    // User.findAll().then(user => {

    //   console.log(user);
    //   res.send({ user });
    // });
  });
});
------------------*/


/* -------------------------------------------------------------------API/USERTEAM------------------------------------------------------------------------------------*/


/*---Create Team in DB--- */
router.post('/api/Team', async (req, res) => {
  try {
    await Team.sync(); // Synchronisieren Sie das Modell mit der Datenbank



    const newTeam = Team.build({
      teamID: uuidv4(), // Generiert eine neue UUID
      teamLeaderID: req.body.teamLeaderID,
      teamName: req.body.teamName
    });
    console.log(newTeam);
    await newTeam.save(); // Speicherz das neue Team in der Datenban

    console.log('Team wurde gespeichert.');
    res.send(newTeam); // Sendet das gespeicherte Team als Response zurück
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Fehler beim Speichern des Teams.' }); // Sendet eine Fehlermeldung als Response zurück
  }
});

module.exports = router;

/*---Create Team in DB--- */
// router.post('/api/Team', async (req, res) => {
//   Team.sync().then(() => {
//     const newTeam = Team.build({
//       teamID: uuidv4(),
//       teamLeaderID: req.body.teamLeaderID,
//       teamName: req.body.teamName

//     })
//     newTeam.save()
//       .then(() => {
//         console.log('Team wurde gespeichert.');
//         res.send(newTeam);

//       })
//       .catch((error) => {
//         // console.error(error);
//         res.send({ error });
//       });


// Team.findAll().then(Team => {

//   //console.log(team);
//   res.send({ Team });
// });
//   });
// });

/* -------------------------------------------------------------------API/Vacation------------------------------------------------------------------------------------*/

/*---Gebuchter Urlaub wird vom Fontend an das Backend gesendet und in die Datenbank geschrieben--- */

router.post('/api/Vacation', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newUrlaub = Vacation.build({
      vacationID: uuidv4(),
      status: req.body.status,
      title: req.body.titel,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      userID: req.body.userID,
    });

    await newUrlaub.save();
    console.log('Urlaub wurde gespeichert.');
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});



/*------ohne fehler handling----
router.post('/api/Vacation', async (req, res) => {
  var data = req.body;
  console.log(data);
  var newUrlaub = Vacation.build({
    vacationID: uuidv4(),
    status: req.body.status,
    title: req.body.titel,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userID: req.body.userID,

  });

  newUrlaub.save()
    .then(() => {
      // console.log('Urlaub wurde gespeichert.');
      res.status(200).send();
    })
});

 --------------*/

/* -------------------------------------------------------------------API/Role------------------------------------------------------------------------------------*/

/*--Role erstellen---*/
router.post('/api/Role', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newRole = Role.build({
      roleID: uuidv4(),
      role: req.body.role,
     
    });

    await newRole.save();
    console.log('Rolle wurde gespeichert.');
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});







/* -------------------------------------------------------------------API/UserRole------------------------------------------------------------------------------------*/


router.get('/api/UserRole', async(req, res) =>{
  try {
    var userRoles = await UserRole.findAll({
      attributes: ['userRoleID', 'userID'],
      include: [{
        model: Role,
        attributes: ['name'],
        where: {
          name: 'role' 
        }
      }]
    });
    res.send(userRoles);
  } catch(error){
    console.error(error);
    res.status(500).send({error});
  }
});






/*--UserRole Abfragen--*/
// router.get('/api/UserRole', async(req, res) =>{
// try {

// var userRole = await UserRole.findAll();

// res.send(userRole);


// }catch(error){
//   console.error(error);
//   res.status(500).send({error});
// }


// });





/*--UserRole erstellen---*/
router.post('/api/UserRole', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const newUserRole = UserRole.build({
      userRoleID: uuidv4(),
      userID: req.body.userID,
      roleID: req.body.roleID,
     
    });

    await newUserRole.save();
    console.log('Mitarbeiter wurde erfogleich eine Rolle zugewiesen.');
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});



module.exports = router;