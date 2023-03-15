const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const Team = require('../teamModel');


/* -------------------------------------------------------------------API/LOGIN------------------------------------------------------------------------------------*/


/*---Login Ablgeich---  

router.get('/api/userDetail', async (req, res) => {
    var userEmail = req.query.email;
    var userPW = req.query.password;
    const user = await User.findOne({where: { userEmail }});
      if (user && (user.dataValues.password === userPW)) {
        const token = jwt.sign(
          { user_id: userEmail },
          "secret",
          {
            expiresIn: "900000ms",
          }
        );
        console.log(user);
        user.dataValues.token = token;
        res.send({ "userId": user.dataValues.userID, "token" : user.dataValues.token });
      } else {
        res.status(404).send('Falsches Passwort');
      }
  });
  */
 
 
 
/* -------------------------------------------------------------------API/User------------------------------------------------------------------------------------*/

/*
router.get('/api/user', async (req, res) => {
    const teamArray = await Team.findAll();
    var cleanTeamArray = [];
    teamArray.forEach(team => {
      delete team.dataValues.createdAt;
      delete team.dataValues.updatedAt;
      cleanTeamArray.push(team.dataValues);
    }); 
  
    var users = await User.findAll();
  
    users.forEach(user => {
      // console.log(user);
      var oTeam = cleanTeamArray.find(function (oEntry) {
        return oEntry.teamID === user.dataValues.teamID;
      });
      user.dataValues.teamName = oTeam.teamName;
    });
    if (users) {
      res.send({ users });
      console.log("Hier drünter steht Günther!");
      console.log(users);
      console.error("Günther");
    }
  });
*/