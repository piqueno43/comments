import React from 'react'

const User = props => {
  return (
    <div>
      logado como {props.email}{' '}
      <button type='button' onClick={props.logout}>
        Sair
      </button>
    </div>
  )
}

export default User
