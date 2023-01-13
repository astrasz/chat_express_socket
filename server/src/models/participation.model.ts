import { Optional } from 'sequelize';
import { Table, Column, Model, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Conversation } from './conversation.model';
import { User } from './user.model';


interface ParticipationAttributes {
  _id: string,
  userId: string,
  conversationId: string
}

type ParticipationCreationAttributes = Optional<ParticipationAttributes, '_id'>

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'participations'
})
export class Participation extends Model<ParticipationAttributes, ParticipationCreationAttributes> {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  _id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  userId!: string

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  conversationId!: string


  @BelongsTo(() => User)
  participant!: User

  @BelongsTo(() => Conversation)
  conversation!: Conversation

}