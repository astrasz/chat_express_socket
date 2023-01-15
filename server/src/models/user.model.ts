import { Optional } from 'sequelize';
import { Table, Column, Model, HasMany, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript/dist/sequelize/data-type/data-type';
import { Conversation } from './conversation.model';
import { Message } from './message.model';
import { Participation } from './participation.model';

interface UserAttributes {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  lastLogout: Date | null;
}

type UserCreationAttributes = Optional<UserAttributes, '_id'>

@Table({
  timestamps: true,
  paranoid: true,
  tableName: 'users'
})
export class User extends Model<UserAttributes, UserCreationAttributes> {

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare _id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.DATE
  })
  declare lastLogout: Date | null

  @BelongsToMany(() => Conversation, () => Participation)
  declare conversations: Array<Conversation & { Participation: Participation; }>;

  @HasMany(() => Message)
  declare messages: Message[];

}