import { createContainer } from 'meteor/react-meteor-data'
import { Invoices } from '../../api/invoices/invoices'
import { Invoice } from '../components/invoice'
import { Meteor } from 'meteor/meteor'

export default createContainer(({ params }) => {
  const { invoiceId } = params
  const subscription = Meteor.subscribe('invoices')
  const loading = !subscription.ready()
  const invoiceFetch = Invoices.find({_id: invoiceId}).fetch()
  const invoice = invoiceFetch[0]
  return { loading, invoice }
}, Invoice)
