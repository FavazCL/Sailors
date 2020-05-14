/**
 * SailorsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // Función para obtener todos los marineros.
    list: (req, res) => {
        Sailors.find().exec((err, sailors) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json(sailors);
        });
    },
    //Funcion que obtiene los marineros dependiendo del rating.
    getByRating: (req, res) => {
        const rating = req.params.rating;
        let p_rating = parseInt(rating, 10);

        Sailors.find({ rating: { '>': p_rating }}).exec((err, sailors) => {
            if (err) {
                res.send(500, {err: err});
            }

            res.json(sailors);
        });
    },
    //
    getByName: (req, res) => {
        const name = req.params.name;

        Sailors.find({ name: name }).exec((err, sailor) => {

            if (err) {
                res.send(500, {err: err});
            }

            res.json(sailor);
        });
    },
    // Función para crear un marinero.
    create: (req, res) => {
        const name = req.body.name;
        const rating = req.body.rating;
        const age = req.body.age;

        Sailors.create({ name: name, rating: rating, age: age }).exec((err) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Marinero creado con éxito.'
            })
        });
    },

    //Actualizar marinero
    update: (req, res) => {
        const name = req.body.name;
        const rating = req.body.rating;
        const age = req.body.age;

        Sailors.update({ _id: req.params.id }, { name: name, rating: rating, age: age })
            .exec((err) => {
                if (err) {
                    res.send(500, { err: err });
                }
                res.json({
                    'status': 'Marinero actualizado con éxito.'
                });
            });
    },

    //Eliminar marinero
    delete: (req, res) => {
        Sailors.destroy({ _id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Marinero eliminado con éxito.'
            })
        });
    },
};

