const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();

const port = 8080;
const webAddress = `http://localhost:${port}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../frontend/forum.html'));
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adem',
    database: 'mydb'
});

db.connect((error) => {
    if (error) {
        console.error('Connection to database failed: ', error);
        return;
    }
    console.log('Connected to database');

    const sqlQuery = `create table if not exists form_usthb (
        formation_master varchar(100),
        last_name varchar(100),
        first_name varchar(100),
        date_of_birth varchar(100),
        wilaya varchar(100),
        address varchar(100),
        code_postal varchar(100),
        phone_number varchar(100),
        email varchar(100),
        matricule_bac varchar(100),
        annee_bac varchar(100),
        moyenne_bac varchar(100),
        serie_bac varchar(100),
        mention_bac varchar(100),
        matricule varchar(100),
        nature_diplome varchar(100),
        domaine varchar(100),
        filliere varchar(100),
        specialite varchar(100),
        niveau_etude varchar(100),
        derniere_semestre varchar(100),
        soutnance_pfe varchar(100)
    )`;

    db.query(sqlQuery, (err) => {
        if (err) {
            console.error('Error creating table: ', err);
        }
        else {
            console.log('Table created and ready');
        }
    });
});

app.post('/post-user-data', (request, response) => {
    const { formationMaster, lastName, firstName,
            dateOfBirth, wilaya, address, codePostal,
            phoneNumber, email, matriculeBAC,
            anneeBAC, moyenneBAC, serieBAC,
            mentionBAC, matricule, natureDiplome,
            domaine, filliere, specialite, niveauEtude,
            dernierSemestre, soutnancePFE } = request.body;

    const sqlQuery = `insert into form_usthb (
                      formation_master, last_name, first_name,
                      date_of_birth, wilaya, address, code_postal,
                      phone_number, email, matricule_bac,
                      annee_bac, moyenne_bac, serie_bac,
                      mention_bac, matricule, nature_diplome,
                      domaine, filliere, specialite, niveau_etude,
                      derniere_semestre, soutnance_pfe
                      ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`;

    console.log('Inserting data: ', request.body);
    db.query(sqlQuery, [
                        formationMaster, lastName, firstName,
                        dateOfBirth, wilaya, address, codePostal,
                        phoneNumber, email, matriculeBAC,
                        anneeBAC, moyenneBAC, serieBAC,
                        mentionBAC, matricule, natureDiplome,
                        domaine, filliere,specialite, niveauEtude,
                        dernierSemestre, soutnancePFE
                        ],

    (error, result) => {
        if (error) {
            console.error('Error puting data: ', error.message);
            return response.status(500).json({success: false, message: 'Database error', result});
        }
        console.log('Message from the backend: Data inserted');
        return response.status(200).json(result);
    });
});

app.get('/favicon.ico', (request, response) => {
    response.status(204).end();
});

app.listen(port, () => {
    console.log(`Server running at ${webAddress}`);
});