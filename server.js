const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })


const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/contact/send-message', upload.single('img'), (req, res) => {
  const { author, sender, title, message } = req.body;
  const img = req.file;
  console.log('DEBUG send-message: ', req.body, img);
  if(author && sender && title && message && img) {
    res.render('contact', { isSent: true, img: img.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

// wczytaj szablon ./views/hello.hbs, podmień placeholder name na req.params.name, a na końcu zwróć już zmienioną treść jako odpowiedź dla klienta.

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});