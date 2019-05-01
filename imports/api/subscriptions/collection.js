import { Mongo } from 'meteor/mongo';

const Subscriptions = new Mongo.Collection('subscriptions');

export default Subscriptions;
