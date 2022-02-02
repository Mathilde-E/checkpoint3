import express from 'express';
import Users from '../models/usersModel.js';
const router = express.Router(); 

// Dans ce controller, toutes les routes commencent par /users cf(routes/routings.js L:8)
router.get('/', (req, res) => {
    Users.getAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    Users.getOneById(id).then(user => {
        if (user[0]) res.status(200).json(user);
        else res.status(404).json({error : 'Not Found, please check the ID.'});
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

router.post('/', (req, res) => {
    const { firstname, lastname, phoneNumber, email, password, isAdmin } = req.body;
    const validInput = Users.validate({ firstname, lastname, phoneNumber, email, password, isAdmin });
      if (!validInput.error) {
        Users.createNew(validInput.value).then(userId => {
            const newUser = { userId, ...validInput.value };
            res.status(200).json(newUser);
        }).catch(err => {
            res.status(500).json({error : err.message})
        })
    }
    else res.status(422).json({Error : validInput.error.details[0].message});
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const validInput = Users.validate(req.body, false);
      if (!validInput.error) {
        Users.updateusers(validInput.value, id).then(() => {
            Users.getOneById(id).then(newUser => {
                res.status(200).json(newUser)
            })
        }).catch(err => {
            res.status(500).json({error : err.message})
        })
    }
    else res.status(422).json({Error : validInput.error.details[0].message});
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Users.deleteById(id).then(result => {
        if (result > 0) res.status(200).send('User removed succesfully.');
        else res.status(404).json({error : "User not found, check the ID or make sure you haven't already deleted it."});
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

export default router;