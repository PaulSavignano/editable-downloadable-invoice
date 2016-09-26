import React from 'react'
import { Grid } from 'react-bootstrap'

export const InvoicesLayout = React.createClass({
  propTypes: {
    children: React.PropTypes.element.isRequired,
  },
  render() {
    return <div>
      <Grid>
        { this.props.children }
      </Grid>
    </div>
  },
})
