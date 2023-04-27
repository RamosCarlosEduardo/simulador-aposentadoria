import React, { useState } from 'react'
import Input from './components/Input'
import { fv } from '../../utils/futureValue'

function Home() {
  const [formValues, setFormValues] = useState({})
  console.log(formValues)
  
  function simulation () {
    console.log(fv(0.04,35,18000,20000, 0))
    console.log(fv(0.04,35,18000,20000, 1))
  }
  return (
    <div>
      <Input
        handleChange={setFormValues}
        id="ageCurrent"
        type="number"
        min="0"
        max="130">
        Idade Atual
      </Input>
      <Input
        handleChange={setFormValues}
        id="ageRetire"
        type="number"
        min="0"
        max="130">
          Idade que deseja se aposentar
      </Input>
      <Input
        handleChange={setFormValues}
        id="contributionInitial"
        min="0">
          Aporte inicial
      </Input>
      <Input id="contributionRecurrent">Aporte recorrente</Input>
      <Input id="retiredExpenses">Quanto deseja receber após se aposentar</Input>
      <Input id="rentability">Rentabilidade anual</Input>
      <Input id="inflaction">Inflação anual</Input>
      <button onClick={simulation}>Calcular</button>
    </div>
  )
}

export default Home