import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { Invoices } from '../invoices'
import { Invoice } from '../../../ui/components/invoice'
import { generateComponentAsPDF } from '../../../modules/server/generate-pdf'

export const downloadPDF = new ValidatedMethod({
  name: 'invoices.download',
  validate: new SimpleSchema({
    invoiceId: { type: String },
  }).validator(),
  run({ invoiceId }) {
    const invoice = Invoices.findOne({ _id: invoiceId })
    const fileName = `invoice_${invoice._id}.pdf`
    return generateComponentAsPDF({ component: Invoice, props: { invoice }, fileName })
    .then((result) => result)
    .catch((error) => { throw new Meteor.Error('500', error) })
  },
})
