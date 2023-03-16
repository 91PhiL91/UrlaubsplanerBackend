const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const Team = require('./models/teamModel');
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


router.get('/api/team', async (req, res) => {
  var teams = await Team.findAll().then(teams => {
    console.log(teams);
    res.send({ teams });
  }).catch((err) => {
    console.error('Unable to query users:', err);
    res.sendStatus(500);
  });
});





/* -------------------------------------------------------------------API/USERDETAIL------------------------------------------------------------------------------------*/

//Postman --> http://localhost:3000/api/userDetail?email=test@mail.de&password=1234

/*---Login Ablgeich---*/
// router.get('/api/userDetail' ,/* authHelper*/ async (req, res) => {
//   var email = req.query.email;
//   var userPW = req.query.password;
//   const user = await User.findOne({ where: { email } });
//   if (user && (user.dataValues.password === userPW)) {
//     const token = jwt.sign(
//       { user_id: email },
//       "secret",
//       {
//         expiresIn: "900000ms",
//       }
//     );
//     console.log(user);
//     user.dataValues.token = token;
//     res.send({ "userID": user.dataValues.userID, "token": user.dataValues.token });
//   } else {
//     res.status(404).send('Falsches Passwort');
//   }
// });

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






/* -------------------------------------------------------------------API/User------------------------------------------------------------------------------------*/



/*---CreateNew User in DB--- */
router.post('/api/user', async (req, res) => {

   const hashedPassword = await hashPassword(req.body.password);

   console.log("Das ist das gehaste Passwort : " , hashedPassword);

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



/* -------------------------------------------------------------------API/USERTEAM------------------------------------------------------------------------------------*/









module.exports = router;