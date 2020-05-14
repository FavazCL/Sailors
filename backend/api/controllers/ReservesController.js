/**
 * ReservesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //Función para listar las reservas.
    list: (req, res) => {
        Reserves.find().exec((err, reserves) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json(reserves);
        });
    },
    //Funcion para listar el master-detail.
    allDetails: (req, res) => {
        Reserves.find().populate("sailor").populate("boat").exec(function (err, reserves) {
            if (err) {
                res.send(500, {err: err});
            }

            res.json(reserves)
        });
    },
    //Funcion para listar el master-detail.
    sailorDetails: (req, res) => {
        const sailor = req.params.id;
        
        Reserves.find({ 
            where: {
                sailor: sailor
            }
        }).populate("sailor").populate("boat").exec(function (err, reserves) {
            if (err) {
                res.send(500, {err: err});
            }

            res.json(reserves)
        });
    },
    //Función para crear una reserva.
    create: (req, res) => {
        const sailor = req.body.sailor;
        const boat = req.body.boat;
        const day = req.body.day;

        console.log(sailor);
        console.log(boat);
        console.log(day);

        Reserves.create({ sailor: sailor, boat: boat, day: day }).exec((err) => {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Reserva creada con éxito.'
            })
        });
    },

    //Actualizar reserva
    update: (req, res) => {
        const sailor = req.body.sailor;
        const boat = req.body.boat;
        const day = req.body.day;


        Reserves.update({ _id: req.params.id }, { sailor: sailor, boat: boat, day: day })
            .exec((err) => {
                if (err) {
                    res.send(500, { err: err });
                }
                res.json({
                    'status': 'Reserva actualizada con éxito.'
                });
            });
    },

    //Eliminar reserva
    delete: (req, res) => {
        Reserves.destroy({ _id: req.params.id }).exec(function (err) {
            if (err) {
                res.send(500, { err: err });
            }
            res.json({
                'status': 'Reserve eliminado con éxito.'
            })
        });
    },
};

