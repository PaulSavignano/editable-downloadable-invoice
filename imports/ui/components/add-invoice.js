import React from 'react'
import { browserHistory } from 'react-router'
import { FormGroup, FormControl, Button } from 'react-bootstrap'
import { Bert } from 'meteor/themeteorchef:bert'
import { insertInvoice } from '../../api/invoices/methods'

const handleInsertInvoice = (event) => {
  event.preventDefault()
  insertInvoice.call({
  }, (error, result) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      browserHistory.push(`/invoices/${result}`)
    }
  })
}

export const AddInvoice = () => (
  <Button onClick={ handleInsertInvoice } bsStyle="success">Add Invoice</Button>
)
