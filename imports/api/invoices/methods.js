import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Invoices } from './invoices'

export const insertInvoice = new ValidatedMethod({
  name: 'invoices.insert',
  validate: new SimpleSchema({}).validator(),
  run() {
    return Invoices.insert({
      number: '100100',
      date: '10/31/2016',
      terms: 'Due on receipt',
      bill_to: 'elliot.alderson@fsociety.com',
      bill_to_cc: 'edward.alderson@fsociety.com',
      description: 'Created season 3 web application to hack evil corp',
      hours: '15',
      rate: '$90.00',
      amount: '$1350.00',
      amount_paid: '$0.00',
      amount_due: '$0.00',
      notes: 'Thanks for your business!',
    })
  },
})

export const updateInvoice = new ValidatedMethod({
  name: 'invoices.update',
  validate: new SimpleSchema({
    _id: { type: String },
    number: { type: String, optional: true },
    date: { type: String, optional: true },
    terms: { type: String, optional: true },
    bill_to: { type: String, optional: true },
    bill_to_cc: { type: String, optional: true },
    description: { type: String, optional: true },
    hours: { type: String, optional: true },
    rate: { type: String, optional: true },
    notes: { type: String, optional: true },
  }).validator(),
  run({ _id, number, date, terms, bill_to, bill_to_cc, description, hours, rate, notes }) {
    Invoices.update(_id, { $set: { number, date, terms, bill_to, bill_to_cc, description, hours, rate, notes } })
  },
})

export const removeInvoice = new ValidatedMethod({
  name: 'invoices.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    Invoices.remove(_id)
  },
})
