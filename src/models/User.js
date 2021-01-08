const {Model, DataTypes} = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Esse campo não pode ser vazio."
                    },
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,    
                validate: {
                    isEmail: {
                        msg: "Esse campo precisa ser um e-mail."
                    },
                },
            }
        }, {
            sequelize: connection
        })
    }
    static associate(models) {
        this.hasMany(models.Finances,{ foreignKey: 'user_id', as: 'finances' })
    }
}

module.exports = User;