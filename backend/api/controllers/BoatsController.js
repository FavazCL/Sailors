/**
 * BoatsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //Función para obtener los botes.
    list: (req, res) => {
        Boats.find().exec((err, boats) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json(boats);
        });
    },
    //Funcion que obtiene los botes dependiendo del color.
    getByColor: (req, res) => {
        const color = req.params.color;
        
        console.log(color);

        Boats.find({ color: color }).exec((err, boats) => {
            if (err) {
                res.send(500, {err: err});
            }

            res.json(boats);
        });
    },
    //
    getByName: (req, res) => {
        const name = req.params.name;
        console.log(name);
        Boats.findOne({ name: name }).exec((err, boat) => {

            if (err) {
                res.send(500, {err: err});
            }

            res.json(boat);
        });
    },
    //Función para crear un nuevo bote.
    create: (req, res) => {
        const name = req.body.name;
        const color = req.body.color;

        Boats.create({ name: name, color: color }).exec((err) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Bote creado con éxito.'
            })
        });
    },

    //Actualizar un bote
    update: (req, res) => {
        const name = req.body.name;
        const color = req.body.color;


        Boats.update({ _id: req.params.id }, { name: name, color: color })
            .exec((err) => {
                if (err) {
                    res.send(500, { err: err });
                }
                res.json({
                    'status': 'Bote modificado con éxito.'
                });
            });
    },

    //Eliminar Bote
    delete: (req, res) => {
        Boats.destroy({ _id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Boat eliminado con éxito.'
            })
        });
    },
};

