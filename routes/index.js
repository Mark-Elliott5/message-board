const { formatDistanceToNow } = require('date-fns');
var express = require('express');
var router = express.Router();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date('2023-11-30T10:30:23'),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date('2021-03-06T20:15:55'),
  },
];

function addMessage(message) {
  messages.push(message);
}

function renderIndex(req, res, next) {
  res.render('index', {
    title: 'Message Board',
    messages: messages,
    formatDate: formatDistanceToNow,
  });
}

/* GET home page. */
router.get('/', renderIndex);

router.get('/new', (req, res, next) => {
  res.render('form', {
    title: 'Submit New Message',
  });
});

router.post('/new', (req, res, next) => {
  const currentTime = new Date();
  const newMessage = Object.assign(req.body, { added: currentTime });
  addMessage(newMessage);
  res.redirect('/');
});

module.exports = router;
