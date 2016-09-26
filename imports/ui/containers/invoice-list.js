import { createContainer } from 'meteor/react-meteor-data'
import { Invoices } from '../../api/invoices/invoices'
import { InvoiceList } from '../components/invoice-list'
import { Meteor } from 'meteor/meteor'

export default createContainer(() => {
  const subscription = Meteor.subscribe('invoices')
  const loading = !subscription.ready()
  const invoice = Invoices.find().fetch()
  return { loading, invoice }
}, InvoiceList)
