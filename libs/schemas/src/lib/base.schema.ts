import { Type } from '@nestjs/common';
import { Prop, SchemaFactory, Virtual, VirtualOptions } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Schema } from 'mongoose';

export class BaseSchema {
  _id: ObjectId;

  @Virtual({
    get: function () {
      return (this as VirtualOptions & { _id: ObjectId })._id.toString();
    },
  })
  id: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: new Date() })
  createdAt: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt: Date;

  @Prop({ tSype: Date, default: new Date() })
  deletedAt: Date;
}

export const createSchema = <TClass>(target: Type<TClass>): Schema => {
  const schema = SchemaFactory.createForClass(target);

  schema.set('toJSON', {
    virtuals: true,
  });

  schema.set('versionKey', false);

  schema.set('timestamps', true);

  return schema;
};
