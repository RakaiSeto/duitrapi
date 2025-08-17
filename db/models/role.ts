import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../connection';

interface RoleAttributes {
    role_id: number;
    role_name: string;
}
export interface RoleInput extends Optional<RoleAttributes, 'role_id'> {}
export interface RoleOuput extends Required<RoleAttributes> {}

class Role extends Model<RoleAttributes, RoleInput> implements RoleAttributes {
    public role_id!: number;
    public role_name!: string;
}

Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    timestamps: false
});

export default Role;
