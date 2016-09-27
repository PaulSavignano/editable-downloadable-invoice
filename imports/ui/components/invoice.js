import React from 'react'
import { Link, browserHistory } from 'react-router'
import InlineCss from 'react-inline-css'
import { Button, ListGroupItem } from 'react-bootstrap'
import { Loading } from './loading'
import { Meteor } from 'meteor/meteor'
import { Bert } from 'meteor/themeteorchef:bert'
import fileSaver from 'file-saver'
import { updateInvoice, removeInvoice } from '../../api/invoices/methods'
import { base64ToBlob } from '../../modules/base64-to-blob'

const handleDownloadPDF = (event) => {
  event.preventDefault()
  const { target } = event
  const invoiceId = target.getAttribute('data-id')
  target.innerHTML = '<em>Downloading...</em>'
  Meteor.call('invoices.download', { invoiceId }, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      const blob = base64ToBlob(response.base64)
      fileSaver.saveAs(blob, response.fileName)
      target.innerHTML = 'Download'
    }
  })
}

const handleUpdateInvoice = (event) => {
  event.preventDefault()
  const invoiceId = event.target.getAttribute('data-id')
  const form = document.querySelector('[name="invoice-form"]')
  const number = form.querySelector('[name="number"]').innerText
  const date = form.querySelector('[name="date"]').innerText
  const terms = form.querySelector('[name="terms"]').innerText
  const bill_to = form.querySelector('[name="bill_to"]').innerText
  const bill_to_cc = form.querySelector('[name="bill_to_cc"]').innerText
  const description = form.querySelector('[name="description"]').innerText
  const hours = form.querySelector('[name="hours"]').innerText
  const rate = form.querySelector('[name="rate"]').innerText
  const notes = form.querySelector('[name="notes"]').innerText
  updateInvoice.call({
    _id: invoiceId,
    number,
    date,
    terms,
    bill_to,
    bill_to_cc,
    description,
    hours,
    rate,
    notes,
  }, (error, result) => {
    if (error) {
      Bert.alert(error.reason, 'danger')
    } else {
      Bert.alert('Invoice updated!', 'success')
    }
  })
}

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
      browserHistory.push('/invoices')
    }
  })
}

const renderInvoice = (invoice) => (
  <InlineCss stylesheet={`
    .flex-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: center;
    align-items: top;
    }
    .flex-item {
    flex: 1 1 auto;
    align-self: auto;
    min-height: auto;
    }
    .invoice-control {
    align-items: center;
    }
    .button-group {
    margin-top: 10px;
    }
    .button-group > button:nth-child(2) {
    margin-left: 5px;
    margin-right: 5px;
    }
    .business-item, .invoice-summary-item {
    flex: 1 1 200px;
    min-width: 200px;
    }
    .invoice-header > .flex-item:nth-child(2) {
    flex: 3 3 30%;
    }
    .invoice-header > .flex-item > table {
    width: 100%;
    }
    .amount-due-summary {
    margin-top: 20px;
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    }
    .description-hours-rate-amount-container {
    border-bottom: 1px solid #e7e7e7;
    }
    .description-item > :nth-child(1), .hours-item > :nth-child(1), .rate-item > :nth-child(1), .amount-item > :nth-child(1) {
    border: 1px solid #e7e7e7;
    background-color: #f8f8f8;
    border-radius: 3px;
    padding: 10px 15px;
    }
    .description-item > :nth-child(2), .hours-item > :nth-child(2), .rate-item > :nth-child(2), .amount-item > :nth-child(2) {
    padding: 10px 15px;
    }
    .description-item {
    flex: 1 1 60%;
    min-width: 230px;
    }
    .hours-rate-amount-container {
    flex-flow: row nowrap
    }
    .hours-rate-amount-item {
    flex: 1 1 40%;
    min-width: 230px;
    }
    .hours-item, .rate-item, .amount-item {
    flex: 1 1 33.333%;
    }
    .total-container {
    flex-wrap: wrap-reverse;
    }
    .total-container > :nth-child(1) {
    flex: 1 1 60%;
    min-width: 230px;
    }
    .total-container > :nth-child(2) {
    flex: 1 1 40%;
    min-width: 230px;
    }
    .total-item > table {
    border-collapse: collapse;
    border: 1px solid #e7e7e7;
    width: 100%;
    margin-top: -1px;
    }
    .total-item > table td {
    border: 1px solid #e7e7e7;
    padding: 10px 15px;
    }
    .total-item > table td:nth-child(2) {
    width: 33.333%;
    }
    [contenteditable]:hover {
    outline: 0px solid transparent;
    background-color: #5bc0de;
    }
    [contenteditable]:focus:not(:hover) {
    outline: 0px solid transparent;
    background-color: #5cb85c;
    }
    [contenteditable]:focus {
    outling: 0px;
    background-color: #5cb85c;
    }
    [contenteditable] {
    padding: 2px;
    border-radius: 3px;
    }

    @media print {
    /* A4 page is 595px width by 852px height */
    header, .hidden { display: none}
    form { zoom: 80% } /* 714px */
    .flex-container {
    display: flex;
    display: -webkit-flex;
    flex-flow: row wrap;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    align-content: center;
    align-items: top;
    }
    .flex-item {
    -webkit-flex: 1;
    flex: 1 1 auto;
    align-self: auto;
    min-height: auto;
    }
    .invoice-control {
    align-items: center;
    }
    .button-group {
    margin-top: 10px;
    }
    .button-group > button:nth-child(2) {
    margin-left: 5px;
    margin-right: 5px;
    }
    .business-item, .invoice-summary-item {
    flex: 1 1 200px;
    min-width: 200px;
    }
    .invoice-header > .flex-item:nth-child(2) {
    flex: 3 3 30%;
    }
    .invoice-header > .flex-item > table {
    width: 100%;
    }
    .amount-due-summary {
    margin-top: 20px;
    border: 1px solid black;
    padding: 10px 15px;
    border-radius: 8px;
    text-align: center;
    }
    .description-hours-rate-amount-container {
    border-bottom: 1px solid #e7e7e7;
    }
    .description-item > :nth-child(1), .hours-item > :nth-child(1), .rate-item > :nth-child(1), .amount-item > :nth-child(1) {
    border: 1px solid #e7e7e7;
    background-color: #f8f8f8;
    border-radius: 3px;
    padding: 10px 15px;
    }
    .description-item > :nth-child(2), .hours-item > :nth-child(2), .rate-item > :nth-child(2), .amount-item > :nth-child(2) {
    padding: 10px 15px;
    }
    .description-item {
    flex: 1 1 60%;
    min-width: 230px;
    }
    .hours-rate-amount-container {
    flex-flow: row nowrap
    }
    .hours-rate-amount-item {
    flex: 1 1 40%;
    min-width: 230px;
    }
    .hours-item, .rate-item, .amount-item {
    flex: 1 1 33.333%;
    }
    .total-container {
    flex-wrap: wrap-reverse;
    }
    .total-container > :nth-child(1) {
    flex: 1 1 60%;
    min-width: 230px;
    }
    .total-container > :nth-child(2) {
    flex: 1 1 40%;
    min-width: 230px;
    }
    .total-item > table {
    border: 1px solid #e7e7e7;
    border-collapse: collapse;
    width: 100%;
    margin-top: -1px;
    }
    .total-item > table td {
    border: 1px solid #e7e7e7;
    padding: 10px 15px;
    }
    .total-item > table td:nth-child(2) {
    width: 33.333%;
    }
    }
  `}>
    <header>
      <section className="flex-container invoice-control">
        <h1>Invoice Details</h1>
        <div className="button-group">
          <Button onClick={ handleDownloadPDF } data-id={ invoice._id } bsStyle="primary">Download</Button>
          <Button onClick={ handleUpdateInvoice } data-id={ invoice._id } bsStyle="success">Update</Button>
          <Button onClick={ handleRemoveInvoice } data-id={ invoice._id } bsStyle="danger">Remove</Button>
        </div>
      </section>
      <hr/>
      <br/><br/>
    </header>

    <ListGroupItem>

      <form onSubmit={ handleUpdateInvoice } data-id={ invoice._id } name="invoice-form">
        <section className="flex-container invoice-header">
          <div className="flex-item business-item">
            <br/>
            <p>
              Paul Savignano<br/>
              1234 Carlsbad Ct<br/>
              Carlsbad, CA 92011
            </p>
            <p>
              Phone: (760) 123-1234<br/>
              Paul.Savignano@gmail.com
            </p>
          </div>
          <div className="flex-item"></div>
          <div className="flex-item invoice-summary-item">
            <h2>Invoice</h2>
            <table>
              <tbody>
                <tr>
                  <td>Invoice #:</td>
                  <td contentEditable="true" suppressContentEditableWarning={true} name="number">
                    { invoice.number }
                  </td>
                </tr>
                <tr>
                  <td>Invoice date:</td>
                  <td contentEditable="true" suppressContentEditableWarning={true} name="date">
                    { invoice.date }
                  </td>
                </tr>
                <tr>
                  <td>Terms:</td>
                  <td contentEditable="true" suppressContentEditableWarning={true} name="terms">
                    { invoice.terms }
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="amount-due-summary">
              <div>Amount Due:</div>
              <div><strong>$1050.00</strong></div>
            </div>
          </div>
        </section>
        <br/>
        <hr/>

        <section className="bill-to">
          <h3>Bill To:</h3>
          <div contentEditable="true" suppressContentEditableWarning={true} name="bill_to">
            { invoice.bill_to }
          </div>
          <h3>CC:</h3>
          <div contentEditable="true" suppressContentEditableWarning={true} name="bill_to_cc">
            { invoice.bill_to_cc }
          </div>
        </section>
        <br/>
        <br/>

        <section className="flex-container description-hours-rate-amount-container">
          <div className="flex-item description-item">
            <div><strong>Description</strong></div>
            <div contentEditable="true" suppressContentEditableWarning={true} name="description">
              { invoice.description }
            </div>
          </div>
          <div className="flex-item hours-rate-amount-item">
            <div className="flex-container hours-rate-amount-container">
              <div className="flex-item hours-item">
                <div><strong>Hours</strong></div>
                <div contentEditable="true" suppressContentEditableWarning={true} name="hours">
                  { invoice.hours }
                </div>
              </div>
              <div className="flex-item rate-item">
                <div><strong>Rate</strong></div>
                <div contentEditable="true" suppressContentEditableWarning={true} name="rate">
                  { invoice.rate }
                </div>
              </div>
              <div className="flex-item amount-item">
                <div><strong>Amount</strong></div>
                <div>$1050.00</div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex-container total-container">
          <div className="flex-item"></div>
          <div className="flex-item total-item">
            <table>
              <tbody>
                <tr>
                  <td>Subtotal:</td>
                  <td>$1050.00</td>
                </tr>
                <tr>
                  <td>Total:</td>
                  <td>$1050.00</td>
                </tr>
                <tr>
                  <td>Amount paid:</td>
                  <td>$1050.00</td>
                </tr>
                <tr>
                  <td>Amount due:</td>
                  <td>$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <br/>
        <hr/>

        <section className="invoice-notes">
          <h3>Notes:</h3>
          <div contentEditable="true" suppressContentEditableWarning={true} name="notes">
            { invoice.notes }<br/>
          </div>
        </section>
        <br/>
      </form>
    </ListGroupItem>
  </InlineCss>
)

export const Invoice = ({ loading, invoice }) => {
  return loading ? <Loading /> : renderInvoice(invoice)
}

Invoice.propTypes = {
  invoice: React.PropTypes.object.isRequired,
}
