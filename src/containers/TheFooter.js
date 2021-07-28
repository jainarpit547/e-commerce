import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="/#" rel="noopener noreferrer">Football</a>
        <span className="ml-1">&copy; 2020-2021.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
