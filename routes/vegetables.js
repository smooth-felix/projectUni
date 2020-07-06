const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Vegetable = require('../models/vegetables');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter

});

router.post('/add' ,upload.single('vegetableImage'),  (req,res,next)=>{
    let newVegetable = new Vegetable({
        _id : new mongoose.Types.ObjectId,
        imageSrc : req.file.filename,
        nameEnglish : req.body.nameEnglish,
        nameSinhala : req.body.nameSinhala,
        nameTamil : req.body.nameTamil,
        harvestTime : req.body.harvestTime
    })

    newVegetable.save().then(()=>{
        res.status(201).json({success: 'true', msg:'Successfully Added'});
    }).catch(err=>{
        res.status(400).json({success : 'false', msg : 'Failed Save'});
    });

});

router.get('/all', async (req,res,next)=>{
    const allVegetables = await Vegetable.find();
    res.json(allVegetables);

});

router.get('/:vegetableID', async (req,res,next)=>{
    const result = await Vegetable.findById(req.params.vegetableID);
    res.json(result);
});

router.delete('/:id', async (req,res,next)=>{
    const getVegetable = await Vegetable.findById(req.params.id);
    const filePath = './uploads/'+getVegetable.imageSrc;

    fs.unlink(filePath, (err,data)=>{
        if(err) throw err;
    });
    const deleteVegetable = await Vegetable.deleteOne({_id : req.params.id});
    res.status(201).json({message : 'successfully deleted'});
})

module.exports = router;