import dbConnect from '../config/db-config.js';
import Joi from 'joi';

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    firstname: Joi.string().max(255).presence(presence),
    lastname: Joi.string().max(255).presence(presence),
    phoneNumber: Joi.number().integer().max(10).presence(presence),
    email: Joi.string().email().max(255).presence(presence),
    password: Joi.string().max(255).presence(presence),
    token: Joi.string().max(255),
    isAdmin: Joi.boolean().default(false).presence('optional'),
  }).validate(data, {abortEarly: false})
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT * FROM users', (err, results) => {
            // si la requete n'est pas bonne on retourne une erreur
            if (err) reject(err);
            // sinon on retourne les résultats
            else resolve(results);
        })
    })
}

// READ ONEconst getOneById = (id) => {
    const getOneById = (id) => {
        return new Promise((resolve, reject) => {
            dbConnect.query('SELECT * FROM users WHERE id = ?', id, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            })
        })
    }
    
const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT email, password, id FROM users WHERE email = ?', email, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    })
  })
}

const findByToken = (token) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('SELECT id ,email, firstname, lastname, phoneNumber, isAdmin FROM users WHERE token = ?', token, (err, result) => {
            if(err) reject(err);
            else resolve(result[0]);
        })
    })
}

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('DELETE FROM users WHERE id = ?', id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        })
    })
}

// CREATE
const createNew = (values) => {
    const { firstname, lastname, phoneNumber, email, password, isAdmin } = values;
    return new Promise((resolve, reject) => {
        dbConnect.query('INSERT INTO users (firstname, lastname, phoneNumber, email, password, isAdmin) VALUES (?, ?, ?, ?, ?, ?)', [firstname, lastname, phoneNumber, email, password, isAdmin], (err, result) => {
            if (err) reject(err);
            else resolve(result.insertId);
        })
    })
}

// UPDATE
const updateusers = (newValues, id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE users SET ? WHERE id = ?', [newValues, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

const tokenUpdate = (token, id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query('UPDATE users SET ? WHERE id = ?', [token, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// exporter toutes les fonctions du model
export default { getAll, getOneById, deleteById, createNew, updateusers, validate, findOneByEmail, findByToken, tokenUpdate };