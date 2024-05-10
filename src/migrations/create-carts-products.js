import { DataTypes } from 'sequelize';

export async function up(queryInterface) {
  const transaction = await queryInterface.sequelize.transaction();
  try {
    await queryInterface.createTable('cartsProducts', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'carts',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: {
            tableName: 'products',
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
