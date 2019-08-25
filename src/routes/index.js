var express = require('express');
var router = express.Router();

const {id, secret} = require('../../config');

const OAuthClient = require('disco-oauth');
const discoClient = new OAuthClient(id, secret);

discoClient.setScopes(['identify', 'guilds']);
discoClient.setRedirect('http://localhost:3000/login');

/* GET home page. */
router.get('/is-authorized', (req, res) => {
  if (req.cookies.token) {
    res.send({authorized: true});
  } else {
    res.send({authorized: false});
  }
});

router.get('/auth', (req, res) => {
  res.redirect(discoClient.getAuthCodeLink());
});

router.get('/login', async (req, res) => {
  if (!req.query.code) res.status(404).send('AUTH CODE NOT FOUND!');
  else {
    try {
      let key = await discoClient.getAccess(req.query.code);
      res.cookie('token', key, {maxAge: 3600000});
      res.redirect('/home');
    } catch (err) {
      console.error(err);
      res.status(401).send('There was some error logging you in! Please try again after some time or report at our <a href="https://discord.gg/dSWZwUe">Discord Server!</a>')
    }
  }
});

module.exports = router;
