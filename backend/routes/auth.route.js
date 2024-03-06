const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const router = Router();

router.post('/registration',
    [
        check('email', 'Nekorektni email').isEmail(),
        check('password', 'Nekorektni parol').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Nekorektnie dannie pri registracii',
                })
            }

            const { email, password } = req.body;
            const isUsed = await User.findOne({ email });

            if (isUsed) {
                return res.status(300).json({ message: 'Ays email-@ arden zbaxvac e, pordzeq urish@' });
            }

            const hachedPassword = await bcrypt.hash(password, 12);

            const user = new User({ email, password: hachedPassword });
            await user.save();
            res.status(201).json({ message: 'Akaunt@ stexcvec' });
        } catch (error) {
            console.log(error);
        }
    }
)

router.post('/login',
    [
        check('email', 'Nekorektni email').isEmail(),
        check('password', 'Nekorektni parol').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Nekorektnie dannie pri vxode',
                })
            }

            const { email, password } = req.body;
            const user = await User.findOne({email});

            if(!user) {
                return res.status(400).json({message: 'Takovo email v baze'});
            }

            const isMatched = bcrypt.compare(password, user.password);
            
            if(!isMatched) {
                return res.status(400).json({message: 'Neverni parol'});
            }

            const token = jwt.sign(
                {userId: user.id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'}
            )

            res.json({token, userId: user.id});
        } catch (error) {
            console.log(error);
        }
    }
)

module.exports = router;