import { Router } from 'express';

const webAuthRouter = Router();

webAuthRouter.get('/login', (req, res) => {
    return res.render('pages/auth/login', {
        title: 'Login',
        pageScripts: ['/javascript/pages/login.js'],
        hideNavbar: true,
    });
});

webAuthRouter.get('/register', (req, res) => {
    return res.render('pages/auth/register', {
        title: 'Register',
        pageScripts: ['/javascript/pages/register.js'],
        hideNavbar: true,
    });
});

export default webAuthRouter;
