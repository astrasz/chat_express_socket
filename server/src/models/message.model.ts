import { Optional } from 'sequelize';
import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Conversation } from './conversation.model';
import { User } from './user.model';

interface MessageAttributes {
  _id: string;
  content: string;
  senderId: string;
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
  declare _id: string;

  @Column({
    type: DataType.STRING,
  })
  declare content?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  declare senderId: string;

  @BelongsTo(() => User)
  declare sender: User;

  @BelongsTo(() => Conversation, 'conversationId')
  declare conversation: Conversation

  @BelongsTo(() => Conversation, 'conversationLastMessageId')
  declare conversationLastMessage: Conversation

}