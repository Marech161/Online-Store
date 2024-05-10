import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('carts', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      payStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }, { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}

export async function down(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.dropTable('carts', { transaction });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    throw err;
  }
}
