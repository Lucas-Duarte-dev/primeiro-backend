const User = require('../models/User');


module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users)
    },


    async store(req, res) {
        try {
            const { name, email } = req.body; 
            
            const user = await User.findOrCreate({ where: {name, email} });                
            
            return res.json(user)
            
        } catch (error) {
            res.status(400).send({err: error})
        }
    },

    async delete(req, res) {
        try {
            const { user_id } = req.params;
            

            const user = await User.findByPk(user_id);
            if(!user) {
                return res.status(400).json({error: "User not found."});
            }

            await User.destroy({
                where: {
                    id: user.id,
                }, force: true
            })

            res.status(200).json({user: "Seu usuário foi deletado"})
        } catch (error) {
            res.status(403).send({err: error})
        }
    }
}