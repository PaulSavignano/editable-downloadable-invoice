import React from 'react'
import { Link, LinkContainer } from 'react-router'
import { ListGroup, ListGroupItem, Button, Alert } from 'react-bootstrap'
import { Loading } from './loading'
import { Bert } from 'meteor/themeteorchef:bert'
import { removeInvoice } from '../../api/invoices/methods'

const handleRemoveInvoice = (event) => {
  event.preventDefault()
  const invoiceId = event.target.getAttribute('data-id')
  removeInvoice.call({
    _id: invoiceId,
  }, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('Invoice removed.', 'success')
    }
  })
}

const renderInvoicesList = (invoices) => (
  invoices.length > 0 ?
  <ListGroup className="invoices-list">
    {invoices.map((invoice) => {
      const url = `/invoices/${invoice._id}`
      return (
        <ListGroupItem key={ invoice._id } className="clearfix">
          <Link to={url}>Invoice: {invoice.bill_to}</Link>
          <Button onClick={ handleRemoveInvoice } data-id={ invoice._id } bsStyle="danger" className="pull-right">Remove</Button>
        </ListGroupItem>
      )
    })}
  </ListGroup> :
  <Alert bsStyle="warning">No invoices yet.</Alert>
)

export const InvoicesList = ({ loading, invoices }) => {
  return loading ? <Loading /> : renderInvoicesList(invoices)
}

InvoicesList.propTypes = {
  invoices: React.PropTypes.array,
}
