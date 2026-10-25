import express, { application } from 'express'
import url from '../models/url';
import { nanoid } from 'nanoid';


const router = express.Router()

router.post('/shorten', async (req,res) => {
    try {
        
        const originalURL = req.body;

        if (!originalURL) {
            return res.status(400).json({error: "Original URL is required"})
        }
        try{
            new URL(originalURL)
        } catch (error) {
            return res.status(400).json({error: "Invalid URL"})
        }

        let shortURL;
        let exists = true;

        while (exists) {
            shortURL = nanoid(8);
            const existingURL = await url.findOne({shortURL});
            if (!existingURL) {
                exists = false;
            }
        }
        const newURL = new url({
            originalURL,
            shortURL
        });
        await newURL.save();
        res.json({shortURL: `${process.env.BASE_URL}/${shortURL}`});


    } catch (error) {
        console.log(error);
        
        res.status(500).json({error: "Server error"})
        
    }
})