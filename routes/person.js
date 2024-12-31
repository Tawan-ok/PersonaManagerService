const express = require('express')
const router = express.Router();
const Person = require('../models/person')

router.post('/', async(req, res) => {
    try {
        const {firstName, lastName, birthDate, age, gender} = req.body;
        const person = new Person({firstName, lastName, birthDate, age, gender})
        await person.save();
        res.status(201).json(person)
    } catch (error) {
        res.status(400).json({message : error.message});
    } 
})

router.get('/', async(req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json(persons);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.put('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;
        const person = await Person.findByIdAndUpdate(id, updates, {new:true});
        if(!person) return res.status(404).json({message: 'Person not found'});
        res.status(200).json(person)
    }catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const person = await Person.findByIdAndDelete(id);
        if(!person) return res.status(404).json({message:'Person not found'})
        res.status(200).json({message:'Person deleted successfully'});
    } catch(error) {
        res.status(500).json({message:error.message});
    }
})

module.exports = router