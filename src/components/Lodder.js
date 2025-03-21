import React from 'react'
import Walk from './Walk.gif'
function Lodder() {
  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <img src={Walk} alt="" />
    </div>
  )
}

export default Lodder
