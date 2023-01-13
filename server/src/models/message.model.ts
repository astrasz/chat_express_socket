import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Conversation } from './conversation.model';
import { User } from './user.model';

interface MessageAttributes {
  _id: string;
  content: string;
  senderId: string;
  conversationId: string;
}

type MessageCreationAtributes = Optional<MessageAttributes, '_id'>


@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'messages'
})
export class Message extends Model<MessageAttributes, MessageCreationAtributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  _id!: string;

  @Column({
    type: DataType.STRING,
  })
  content?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  senderId!: string;

  @ForeignKey(() => Conversation)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  conversationId!: string;

  @BelongsTo(() => User)
  sender!: User

  @BelongsTo(() => Conversation)
  conversation!: Conversation

}