const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../db/index.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '/../client/dist')));
app.use('/:id', express.static(path.join(__dirname, '/../client/dist')));

app.get('/api/albums/:id', (req, res) => {
  const album_id = req.params.id;
  db.getAlbumsByAlbumId(album_id, (err, albums) => {
    if (err) {
      res.status(500).send('Error getting albums');
    }
    res.status(200).json(albums.rows);
  });
});


app.post('/api/albums/:id', (req, res) => {
  const album_id = req.params.id;
  const { name, artist, image, tags, description } = req.body;
  db.addAlbum(album_id, name, artist, image, tags, description, (err, addedAlbum) => {
    if (err) {
      res.status(500).send('Error adding new album');
    }
    res.status(200).json(addedAlbum.rows);
  });
});

app.put('/api/albums/:id', (req, res) => {
  const { id } = req.body; // primary key id of recommended album
  const toUpdate = req.body; // HOW TO GET TO UPDATE COLUMN
  const value = req.body; // HOW TO EXTRACT VALUE

  db.updateAlbum(id, toUpdate, value, (err, updatedAlbum) => {
    if (err) {
      res.status(500).send('Error adding new album');
    }
    res.status(200).json(updatedAlbum.rows);
  });
});

app.delete('/api/albums/:id', (req, res) => {
  const { id } = req.body; // primary key id of recommended album
  db.deleteAlbum(id, (err, deletedAlbum) => {
    if (err) {
      res.status(500).send('Error adding new album');
    }
    res.status(200).json(deletedAlbum.rows);
  });
});


app.listen(port, () => console.log(`Listening on port ${port}!`));
