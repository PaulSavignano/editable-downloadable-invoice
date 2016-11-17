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
  const numberString = form.querySelector('[name="number"]').innerText
  const date = form.querySelector('[name="date"]').innerText
  const terms = form.querySelector('[name="terms"]').innerText
  const bill_to = form.querySelector('[name="bill_to"]').innerText
  const bill_to_cc = form.querySelector('[name="bill_to_cc"]').innerText
  const description = form.querySelector('[name="description"]').innerText
  const hoursString = form.querySelector('[name="hours"]').innerText
  const rateString = form.querySelector('[name="rate"]').innerText
  const notes = form.querySelector('[name="notes"]').innerText

  const number = parseFloat(numberString).toFixed(2)/1
  const hours = parseFloat(hoursString).toFixed(2)/1
  const rate = parseFloat(rateString).toFixed(2)/1
  console.log(typeof number)
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

const renderInvoice = (invoice) => {
  const style = {
    form: {
      padding: '10px 15px',
      border: '1px solid #ddd',
    },
    pageHeaderContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      WebkitJustifyContent: 'space-between',
      alignItems: 'center',
    },
    pageButtonsContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row nowrap',
    },
    pageButton2: {
      marginLeft: 5,
      marginRight: 5,
    },
    headerContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      WebkitJustifyContent: 'space-between',
    },
    headerItem: {
      flex: '1 1 200px',
      WebkitFlex: '1 1 200px',
      minWidth: 200,
      maxWidth: 300,
    },
    headerItemSeparator: {
      flex: '3 3 30px',
      WebkitFlex: '3 3 30px',
      minWidth: 30,
    },
    amountDueSum: {
      marginTop: 20,
      border: '1px solid black',
      padding: '10px 15px',
      borderRadius: 8,
      textAlign: 'center',
    },
    detailsContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row wrap',
      justifyContent: 'space-between',
      WebkitJustifyContent: 'space-between',
      borderBottom: '1px solid #e7e7e7',
    },
    detailsDescriptionItem: {
      flex: '1 1 60%',
      WebkitFlex: '1 1 60%',
      minWidth: 230,
    },
    detailsHoursRateAmountContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row nowrap',
    },
    detailsHoursRateAmountItem: {
      flex: '1 1 40%',
      WebkitFlex: '1 1 40%',
      minWidth: 230,
    },
    hoursRateAmountContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row nowrap',
      alignContent: 'center',
    },
    hoursRateAmountItem: {
      flex: '1 1 33.333%',
      WebkitFlex: '1 1 33.333%',
    },
    detailsHeader: {
      border: '1px solid #e7e7e7',
      backgroundColor: '#f8f8f8',
      borderRadius: 3,
      padding: '10px 15px',
    },
    detailsContent: {
      padding: '10px 15px',
    },
    totalContainer: {
      display: 'flex',
      display: '-webkit-flex',
      flexFlow: 'row wrap-reverse',
    },
    totalItemSeparator: {
      flex: '1 1 60%',
      WebkitFlex: '1 1 60%',
      minWidth: 230,
    },
    totalItem: {
      flex: '1 1 40%',
      WebkitFlex: '1 1 40%',
      minWidth: 230,
    },
    totalTable: {
      borderCollapse: 'collapse',
      border: '1px solid #e7e7e7',
      width: '100%',
      marginTop: -1,
    },
    totalTd: {
      border: '1px solid #e7e7e7',
      padding: '10px 15px',
      width: '66.666%',
    },
    totalTd2: {
      width: '33.333%',
    },
  }
  return (
    <InlineCss stylesheet={`
      .dollars::before {
        content: "$";
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
      }
    `}>
      <header>
        <section style={ style.pageHeaderContainer }>
          <h1>Invoice Details</h1>
          <div style={ style.pageButtonsContainer }>
            <Button onClick={ handleDownloadPDF } data-id={ invoice._id } bsStyle="primary">Download</Button>
            <Button onClick={ handleUpdateInvoice } data-id={ invoice._id } bsStyle="success" style={ style.pageButton2 }>Update</Button>
            <Button onClick={ handleRemoveInvoice } data-id={ invoice._id } bsStyle="danger">Remove</Button>
          </div>
        </section>
        <hr/>
        <br/><br/>
      </header>


      <form onSubmit={ handleUpdateInvoice } data-id={ invoice._id } name="invoice-form" style={ style.form }>

        <section style={ style.headerContainer }>
          <div style={ style.headerItem  }>
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
          <div style={ style.headerItemSeparator }></div>
          <div style={ style.headerItem }>
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
            <div style={ style.amountDueSum }>
              <div>Amount Due:</div>
              <div><strong>${ (invoice.amount).toFixed(2) }</strong></div>
            </div>
          </div>
        </section>
        <br/>
        <hr/>

        <section>
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


        <section style={ style.detailsContainer }>
          <div style={ style.detailsDescriptionItem }>
            <div style={ style.detailsHeader }><strong>Description</strong></div>
            <div style={ style.detailsContent } contentEditable="true" suppressContentEditableWarning={true} name="description">
              { invoice.description }
            </div>
          </div>
          <div style={ style.detailsHoursRateAmountItem }>
            <div style={ style.hoursRateAmountContainer }>
              <div style={ style.hoursRateAmountItem }>
                <div style={ style.detailsHeader }><strong>Hours</strong></div>
                <div style={ style.detailsContent } contentEditable="true" suppressContentEditableWarning={true} name="hours">
                  { invoice.hours }
                </div>
              </div>
              <div style={ style.hoursRateAmountItem }>
                <div style={ style.detailsHeader }><strong>Rate</strong></div>
                <div style={ style.detailsContent } className="dollars" contentEditable="true" suppressContentEditableWarning={true} name="rate">
                  { (invoice.rate).toFixed(2) }
                </div>
              </div>
              <div style={ style.hoursRateAmountItem }>
                <div style={ style.detailsHeader }><strong>Amount</strong></div>
                <div style={ style.detailsContent }>
                  { (invoice.amount).toFixed(2) }
                </div>
              </div>
            </div>
          </div>
        </section>


        <section style={ style.totalContainer }>
          <div style={ style.totalItemSeparator }></div>
          <div style={ style.totalItem }>
            <table style={ style.totalTable }>
              <tbody>
                <tr>
                  <td style={ style.totalTd }>Subtotal:</td>
                  <td style={ Object.assign({}, style.totalTd, style.totalTd2) }>
                    ${ (invoice.amount).toFixed(2) }
                  </td>
                </tr>
                <tr>
                  <td style={ style.totalTd }>Total:</td>
                  <td style={ Object.assign({}, style.totalTd, style.totalTd2) }>
                    ${ (invoice.amount).toFixed(2) }
                  </td>
                </tr>
                <tr>
                  <td style={ style.totalTd }>Amount paid:</td>
                  <td style={ Object.assign({}, style.totalTd, style.totalTd2) }>
                    $0.00
                  </td>
                </tr>
                <tr>
                  <td style={ style.totalTd }>Amount due:</td>
                  <td style={ Object.assign({}, style.totalTd, style.totalTd2) }>
                    ${ (invoice.amount_due).toFixed(2) }
                  </td>
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
    </InlineCss>
  )
}

export const Invoice = ({ loading, invoice }) => {
  return loading ? <Loading /> : renderInvoice(invoice)
}

renderInvoice.propTypes = {
  invoice: React.PropTypes.object.isRequired,
}
