import express from 'express';
import Content from '../models/contentModel.js';
const router = express.Router();

// Dans ce controller, toutes les routes commencent par /Content cf(routes/routings.js L:8)
router.get('/', (req, res) => {
    Content.getAll().then(content => {
        res.json(content);
    }).catch(err => {

        res.status(500).json({error : err.message})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Content.getOneById(id).then(content => {
        if (content[0]) res.status(200).json(content);
        else res.status(404).send('Not Found, please check the ID.');
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

router.post('/', (req, res) => {
    const { page_id, categorie_id, content, image, video } = req.body;
    const validInput = Content.validate({ page_id, categorie_id, content, image, video });
      if (!validInput.error) {
        Content.createNew(validInput.value).then(contentId => {
            const newContent = { contentId, ...validInput.value };
            res.status(200).json(newContent);
        }).catch(err => {
            res.status(500).json({error : err.message})
        })
    }
    else res.status(422).json({Error : validInput.error.details[0].message});
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const validInput = Content.validate(req.body, false);
    const contentExist = await Content.getOneById(id);
      if (!contentExist[0]) res.status(404).json({ error : "Content not found" });
      else {
        if (!validInput.error) {
            Content.updateContent(validInput.value, id).then(() => {
                Content.getOneById(id).then(newContent => {
                    res.status(200).json(newContent)
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
    Content.deleteById(id).then(result => {
        if (result > 0) res.status(200).send('Content removed succesfully.');
        else res.status(404).json({ error : "Content not found, check the ID or make sure you haven't already deleted it." });
    }).catch(err => {
        res.status(500).json({error : err.message})
    })
})

export default router;