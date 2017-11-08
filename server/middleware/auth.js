const models = require('../models');
const Promise = require('bluebird');
const utils = require('../lib/hashUtils.js');


var addSessionToRes = function(req, res, okPacket, next) {
  models.Sessions.get({ id: okPacket.insertId })
    .then((data) => {
      console.log('DATA: ', data);
      // data.user = userInfo;
      req.session = data;
      console.log('REQ.SESSION: ', req.session);
      res.cookies = {shortlyid: { value: req.session.hash } };
      res.redirect('/');
      next();
    });
};

var generateNewSession = (req, res, next) => {
  models.Sessions.create()
    .then((okPacket) => {
      models.Users.get({username: req.body.username})
        .then((userInfo) => {
          //update the session table to include the userid
          //Case: there is a user
          // {userId: null}, {userId: userInfo.id}
          if (userInfo !== undefined) {
            models.Sessions.update({userId: null}, {userId: userInfo.id})
              .then(() => {
                addSessionToRes(req, res, okPacket, next);            
              });
          //case: there isn't a user
          } else {
            addSessionToRes(req, res, okPacket, next);
          }
        }); 
    });
};

var loadSession = (req, res, next) => {
  //if hash exists on the cookie
  ////check for hash in sessionsTable
  ////load the session
  models.Sessions.get({hash: req.cookies.shortlyid})
    .then((session) => {
      if (session) {
        req.session = session;
        res.cookies = {shortlyid: { value: req.session.hash } };
        res.redirect('/');
        next();
      } else {
        generateNewSession(req, res, next);
      }
    });
};


module.exports.createSession = (req, res, next) => {
  //provide session id 
  //store it in the database with user info  
  //attach session hash to the cookie 
  //attach cookie to the response obj
  
  //if hash exists on the cookie
  ////check for hash in sessionsTable
  ////load the session
  //else
  console.log('INSIDE CREATE SESSION');
  ////create a session
  // models.Sessions.get({hash: req.cookies.shortlyid})
  //   .then((sessionInfo) => {
  if (req.cookies && req.cookies.shortlyid) {
    console.log('LOAD SESSION PATH');
    loadSession(req, res, next);
  } else {
    console.log('GENERATE SESSION PATH');   
    generateNewSession(req, res, next);                                  
  }
  
  //CAN WE GET SOME CLARIFICATION UP IN HEYA
  // req.session = {};
  // req.session = sessionHash;
  //get the userId based on what user opened the session
};


/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/



















