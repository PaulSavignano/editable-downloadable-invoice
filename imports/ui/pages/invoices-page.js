import React from 'react'
import { PageHeader, Row, Col } from 'react-bootstrap'
import { AddInvoice } from '../components/add-invoice'
import InvoicesList from '../containers/invoices-list'

export const InvoicesPage = () => (
  <Row>
    <Col xs={ 12 }>
      <PageHeader>Invoices</PageHeader>
      <AddInvoice />
      <InvoicesList />
    </Col>
  </Row>
)
