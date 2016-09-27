import { createContainer } from 'meteor/react-meteor-data'
import { Invoices } from '../../api/invoices/invoices'
import { InvoicesList } from '../components/invoices-list'
import { Meteor } from 'meteor/meteor'

export default createContainer(() => {
  const subscription = Meteor.subscribe('invoices')
  const loading = !subscription.ready()
  const invoices = Invoices.find().fetch()
  return { loading, invoices }
}, InvoicesList)
