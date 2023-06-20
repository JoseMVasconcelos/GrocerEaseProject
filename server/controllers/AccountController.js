// Importando Express.
const express = require('express');

// Router do Express.
const router = express.Router();

// Importando UserService.
const accountService = require('../services/AccountService');

// Importando Validações.
const { signUpSchema, loginSchema } = require('../validations/AccountValidation');

// Cadastro do usuário
router.post('/signUp', async (req, res) => {
    try {
        const { validationError } = signUpSchema.validate(req.body);
        if (!validationError) {
            const result = await accountService.SignUp(req.body);
            return res.status(201).json({ message: "Usuário cadastrado com sucesso.", data: result });
        }
        return res.status(400).json({exception:  validationError });
    } catch (error) {
        return res.status(500).json({exception: error });
    }
});

router.post('/login', async (req, res) => {
    try{
        const { validationError } = loginSchema.validate(req.body);
        if (!validationError) {
            const loginResult = await accountService.Login(req.body);

            if (loginResult && loginResult.status === 401){
                return res.status(401).json({message: loginResult.message});
            }

            return res.status(200).json({token: loginResult});
        }

        return res.status(400).json({exception:  validationError });
    } catch (error){
        return res.status(500).json({exception: error });
    }
});

// Exportando o router.
module.exports = router;