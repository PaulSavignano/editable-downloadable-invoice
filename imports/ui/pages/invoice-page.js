import React from 'react'
import { PageHeader, Row, Col } from 'react-bootstrap'
import Invoice from '../containers/invoice'

export const InvoicePage = ({ params }) => (
  <Row>
    <Col xs={ 12 }>
      <Invoice params={params} />
    </Col>
  </Row>
)
