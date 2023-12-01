const { formatDistanceToNow } = require('date-fns');
const Filter = require('bad-words');
const express = require('express');
const router = express.Router();

const filter = new Filter();

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date('2021-03-06T20:15:55'),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date('2023-11-30T10:30:23'),
  },
];

function addMessage(message) {
  messages.push(message);
}

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Message Board',
    messages: messages,
    formatDate: formatDistanceToNow,
  });
});

router.get('/new', (req, res, next) => {
  res.render('form', {
    title: 'Submit New Message',
  });
});

router.post('/new', (req, res, next) => {
  const currentTime = new Date();
  const filteredText = req.body.text ? filter.clean(req.body.text) : '';
  const filteredUser = req.body.user ? filter.clean(req.body.user) : '';
  if (filteredText === '' || filteredUser === '') {
    res.redirect('/');
    return;
  }
  const newMessage = {
    text: filteredText,
    user: filteredUser,
    added: currentTime,
  };
  addMessage(newMessage);
  res.redirect('/');
});

module.exports = router;
