import dbConnect from '../config/db-config.js';
import Joi from 'joi';

const validate = (data, forCreation = true) => {
    const presence = forCreation ? 'required' : 'optional';
    return Joi.object({
      name: Joi.string().presence(presence),
      show: Joi.boolean().default(true),
    }).validate(data, {abortEarly: false})
  }

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM categorie', (err, results) => {
            // si la requete n'est pas bonne on retourne une erreur
            if (err) reject(err);
            // sinon on retourne les résultats
            else resolve(results);
        })
    })
}

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM categorie WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM categorie WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

// CREATE
const createNew = (values) => {
    const { name } = values;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO categorie (name) VALUES (?)', [name], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        })
    })
}

// UPDATE
const updateCategorie = (name, id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE categorie SET ? WHERE id = ?', [name, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll, getOneById, deleteById, createNew, updateCategorie, validate};