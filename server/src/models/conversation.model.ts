import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, ForeignKey, PrimaryKey, HasOne, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Message } from './message.model';
import { Participation } from './participation.model';
import { User } from './user.model';


interface ConversationAttributes {
  _id: string,
  title: string,
  lastMessageId: string,
  lastMessage: Message,
  participants: User[],
  messages: Message[]
}

type ConversationCreationAttributes = Optional<ConversationAttributes, '_id'>

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'conversations'
})
export class Conversation extends Model<ConversationAttributes, ConversationCreationAttributes> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare _id: string;

  @Column({
    type: DataType.STRING,
  })
  declare title?: string | null;

  @ForeignKey(() => Message)
  @Column({
    type: DataType.UUID,
  })
  declare lastMessageId?: string | null

  @HasMany(() => Message, 'conversationId')
  declare messages: Message[]

  @BelongsToMany(() => User, () => Participation)
  declare participants: Array<User & { Participation: Participation }>

  @HasOne(() => Message, 'conversationLastMessageId')
  declare lastMessage?: Message | null
}