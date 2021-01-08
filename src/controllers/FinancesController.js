const Finances = require('../models/Finances');
const User = require('../models/User');


module.exports = {

    async index(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'finances' }
        });

        res.json(user);
    },

    async store(req, res) {
        try {
            const { user_id } = req.params;

            const {local, spent, useful} = req.body;
    
            const user = await User.findByPk(user_id);
    
            if(!user) {
                res.status(400).json({error: "User not found."});
            }
    
            const finances = await Finances.create({
                local,
                spent,
                useful,
                user_id
            });
    
            res.json(finances)
        } catch (error) {
            res.status(400).send({err: error})
        }
       
    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const finance = await Finances.findByPk(id);
            if(!finance) {
                return res.status(400).json({message: "Gasto não encontrado"});
            }

            await Finances.destroy({
                where: {
                    id
                }, force: true
            })

            res.status(200).json({message: "Seu gasto foi deletado"})
        } catch (error) {
            res.status(403).send({err: error})
        }
    }
}