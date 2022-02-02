import dbConnect from '../config/db-config.js';
import Joi from 'joi';

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    page_id: Joi.number().integer().min(1).presence(presence),
    categorie_id: Joi.number().integer(),
    content: Joi.string(),
    image: Joi.string(),
    video: Joi.string(),
  }).validate(data, {abortEarly: false})
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM content', (err, results) => {
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
        dbConnect.query('SELECT * FROM content WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM content WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

// CREATE
const createNew = (values) => {
    const { page_id, categorie_id, content, image, video } = values;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO content (page_id, categorie_id, content, image, video) VALUES (?, ?, ?, ?, ?)', [page_id, categorie_id, content, image, video], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        })
    })
}

// UPDATE
const updateContent = (newValues, id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE content SET ? WHERE id = ?', [newValues, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll, getOneById, deleteById, createNew, updateContent, validate};