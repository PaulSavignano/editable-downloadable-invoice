import { Meteor } from 'meteor/meteor'
import { Invoices } from '../invoices'

Meteor.publish('invoices', () => Invoices.find())
