import React from 'react'
import { PageHeader, Row, Col } from 'react-bootstrap'
import Invoice from '../containers/invoices'

export const InvoicesPage = () => (
  <Row>
    <Col xs={ 12 }>
      <Invoice />
    </Col>
  </Row>
)
