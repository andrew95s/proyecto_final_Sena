const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { ObjectId } = require('mongodb'); // Importar ObjectId de la biblioteca mongodb
const conectar = require('../database/db'); // Importar función de conexión a MongoDB
const { promisify } = require('util');

exports.register = async (req, res) => {
    try {
        const name = req.body.name;
        const user = req.body.user;
        const pass = req.body.pass;
        const passHash = await bcryptjs.hash(pass, 8);

        const cliente = await conectar(); // Obtener cliente MongoDB
        const database = cliente.db();
        const usersCollection = database.collection('users');

        await usersCollection.insertOne({ user: user, name: name, pass: passHash });

        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.login = async (req, res) => {
    try {
        const user = req.body.user;
        const pass = req.body.pass;

        if (!user || !pass) {
            return res.render('login', {
                alert: true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y contraseña",
                alertIcon: 'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        const cliente = await conectar(); // Obtener cliente MongoDB
        const database = cliente.db();
        const usersCollection = database.collection('users');
        const userDoc = await usersCollection.findOne({ user: user });

        if (!userDoc || !(await bcryptjs.compare(pass, userDoc.pass))) {
            return res.render('login', {
                alert: true,
                alertTitle: "Error",
                alertMessage: "Usuario y/o contraseña incorrectas",
                alertIcon: 'error',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            });
        }

        const token = jwt.sign({ id: userDoc._id.toString() }, process.env.JWT_SECRETO, {
            expiresIn: process.env.JWT_TIEMPO_EXPIRA
        });

        const cookiesOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.cookie('jwt', token, cookiesOptions);
        res.render('login', {
            alert: true,
            alertTitle: "Conexión exitosa",
            alertMessage: "¡LOGIN CORRECTO!",
            alertIcon: 'success',
            showConfirmButton: false,
            timer: 800,
            ruta: ''
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error interno del servidor');
    }
};

exports.isAuthenticated = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const cliente = await conectar(); // Obtener cliente MongoDB
            const database = cliente.db();
            const usersCollection = database.collection('users');
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO);
            const userDoc = await usersCollection.findOne({ _id: new ObjectId(decodificada.id) });

            if (!userDoc) {
                return next();
            }

            req.user = userDoc;
            return next();
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        return next();
    }
};

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
};

