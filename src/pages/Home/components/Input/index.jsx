import React from 'react'

function Input({type = "text", id, children, handleChange, ...rest}) {
  function handleChangeLocal () {
    handleChange({bola: "teste"})
  }

  return (
    <div className="caixa">
    <label htmlFor={id}>{`${children}:`}</label>
    <input type={type} id={id} onChange={handleChangeLocal} {...rest} />
</div>
  )
}

export default Input