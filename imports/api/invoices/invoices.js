import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Invoices = new Mongo.Collection('Invoices')

Invoices.schema = new SimpleSchema({
  number: {
    type: String,
    label: 'Invoice #.',
  },
  date: {
    type: String,
    label: 'Invoice date.',
  },
  terms: {
    type: String,
    label: 'Invoice due date.',
  },
  bill_to: {
    type: String,
    label: 'Invoice bill to.',
  },
  bill_to_cc: {
    type: String,
    label: 'Invoice bill to cc.',
  },
  description: {
    type: String,
    label: 'Invoice description.',
  },
  hours: {
    type: String,
    label: 'Invoice hours',
  },
  rate: {
    type: String,
    label: 'Invoice rate.',
  },
  amount: {
    type: String,
    label: 'Invoice total.',
  },
  amount_paid: {
    type: String,
    label: 'Invoice amount paid.',
  },
  amount_due: {
    type: String,
    label: 'Invoice amnout due.',
  },
  notes: {
    type: String,
    label: 'Invoice notes.',
  },
})

Invoices.attachSchema(Invoices.schema)
