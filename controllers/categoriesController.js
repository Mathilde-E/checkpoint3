import express from 'express';
import Categorie from '../models/categoriesModel.js';
const router = express.Router();

// Dans ce controller, toutes les routes commencent par /Categorie cf(routes/routings.js L:8)
router.get('/', (req, res) => {
    Categorie.getAll().then(categorie => {
        res.json(categorie);
    }).catch(err => {

        res.status(500).json({error : err.message})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Categorie.getOneById(id).then(categorie => {
        if (categorie[0]) res.status(200).json(categorie);
        else res.status(404).send('Not Found, please check the ID.');
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

router.post('/', (req, res) => {
    const { name, show } = req.body;
    const validInput = Categorie.validate({ name, show });
      if (!validInput.error) {
        Categorie.createNew(validInput.value).then(id => {
            const newCategorie = { id, ...validInput.value };
            res.status(200).json(newCategorie);
        }).catch(err => {
            res.status(500).json({error : err.message})
        })
    }
    else res.status(422).json({Error : validInput.error.details[0].message});
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const validInput = Categorie.validate(req.body, false);
    const categorieExist = await Categorie.getOneById(id);
      if (!categorieExist[0]) res.status(404).json({ error : "Categorie not found" });
      else {
        if (!validInput.error) {
            Categorie.updateCategorie(validInput.value, id).then(() => {
                Categorie.getOneById(id).then(newCategorie => {
                    res.status(200).json(newCategorie)
                })
            }).catch(err => {
                res.status(500).json({error : err.message})
            })
        }
        else res.status(422).json({Error : validInput.error.details[0].message});
      }
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    Categorie.deleteById(id).then(result => {
        if (result > 0) res.status(200).send('Categorie removed succesfully.');
        else res.status(404).json({ error : "Categorie not found, check the ID or make sure you haven't already deleted it." });
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

export default router;