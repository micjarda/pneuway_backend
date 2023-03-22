//const mongoose = require('mongoose')
require('dotenv').config();
const pneuInitData = require('../models/initData')
const pneuOpeningHours = 0; //= require('../models/pneuWayOpeningHours')

//? Stáhnout si Inicializační data (json)
const setPneuInitData = async (req, res) => {
    const {title, load, reps} = req.body;
    try {
        const workout = await pneuInitData.create({title, load, reps})
        res.status(200).json(workout)
    } 
    catch(error) {
        res.json({error: error.message})
    }
}

//? Nahrát novou otevírací dobu (json)
const postOpeningHours = async (req, res) => {
    const {
        openingHours: {
            sunday, monday, tuesday, wednesday, thursday, friday, saturday
        }
    } = req.body
    
    try {
        const openinghours = await pneuOpeningHours.create(
            {
                openingHours: {
                    sunday, 
                    monday, 
                    tuesday, 
                    wednesday, 
                    thursday, 
                    friday, 
                    saturday
                }
            }
        )
        res.status(200).json(openinghours)
    }
    catch(error) {
        console.error({error: error.message})
    }
}

//? Stáhnout si otevírací dobu (json)
const getAllOpeningHours = async (req, res) => {
    const openingHours = await pneuOpeningHours.find({}).sort({createdAt: -1})

    res.status(200).json(openingHours)
}

//? Je otevřeno (bool)
const itIsOpen = (req, res) => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    let isHolidays = false;
    let itIsOpen = false;
  
    const holidayDateList = [
      [1,1], //Den obnovy samostatného českého státu, Nový rok.
      [2,4], //Velký pátek.
      [5,4], //Velikonoční pondělí.
      [1,5], //Svátek práce.
      [8,5], //Den vítězství.
      [5,7], //Den slovanských věrozvěstů Cyrila a Metoděje.
      [6,7], //Den upálení mistra Jana Husa.
      [28,9], //Den české státnosti.
      [28,10], //Den vzniku samostatného československého státu.
      [17,11], //Den boje za svobodu a demokracii.
      [24,12], //Štědrý den.
      [25,12], //1. svátek vánoční.
      [26,12] //2. svátek vánoční.
    ];

    holidayDateList.forEach(holidayDate => {
        if(holidayDate[0] === day && holidayDate[1] === month)
            isHolidays = true;
    })
  
    if(!isHolidays) {
        if(day >= 1 && day <= 5) { //pracovní týden 8:00 - 17:00
            if(hour >= 8 && hour <= 16)
                itIsOpen = true;
            else
                itIsOpen = false;
        }
        if(day === 6) { //Sobota 8:00 - 12:00
            if(hour >= 8 && hour <= 11)
                itIsOpen = true;
            else
                itIsOpen = false;
        }
    } else { //Svátek (Zavřeno)
        itIsOpen = false;
    }

    res.status(200).json(itIsOpen);
}

module.exports = {
    itIsOpen,
    setPneuInitData,
    postOpeningHours,
    getAllOpeningHours
}