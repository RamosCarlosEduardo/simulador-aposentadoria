import { useRef, useState } from 'react'
import './App.css'
import { Field, Form, Formik } from 'formik'
import {fv} from './utils/futureValue'
import {realTax} from './utils/realTax'
import {formataBRL} from './utils/formatCurrency'
import {MdOutlineLightMode, MdModeNight} from 'react-icons/md'
import {RxDividerVertical} from 'react-icons/rx'


function App() {
  const [calculated, setCalculated] = useState(false)
  const [fvCalculated, setFvCalculated] = useState()
  const [data, setData] = useState({})
  const divRoot = useRef(null)

  function switchTheme () {divRoot.current.classList.toggle('dark')}

  return (
    <div className="grid place-content-center h-screen bg-zinc-500" ref={divRoot}>
    
    <Formik
      initialValues={{
        ageCurrent: 30,
        ageRetired: 65,
        contributionRecurrent: 1500,
        contributionInitial: 20000,
        retiredIncome: 5000,
        rentability: 10,
        inflaction: 5,

      }}
      onSubmit={(values) => {
        let decimalRentability = values.rentability / 100
        let decimalInflaction = values.inflaction / 100
        let taxLiquid = realTax(decimalRentability, decimalInflaction)
        let numberOfPeriods = values.ageRetired - values.ageCurrent
        let currentPayments = values.contributionRecurrent
        let initialPatrimonialValue = values.contributionInitial
        
        setData(values)
        setCalculated(true)
        setFvCalculated(
          fv(taxLiquid, numberOfPeriods, currentPayments, initialPatrimonialValue)
        )
      }}
    >
        <Form className='flex flex-col w-fit items-center text-center border-2 border-blue-200 bg-zinc-50 dark:text-white dark:bg-zinc-800 rounded-md gap-3 p-5'>
          <div className='flex justify-end self-start ml-5 rounded-sm p-1 ring-1 ring-slate-400'>
            <MdOutlineLightMode onClick={switchTheme} className='cursor-pointer' />
            <RxDividerVertical />
            <MdModeNight onClick={switchTheme} className='cursor-pointer' />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="ageCurrent" className=''>Idade atual</label>
            <Field 
              type="number"
              id="ageCurrent"
              name="ageCurrent"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="ageRetired" className=''>Idade para aposentar</label>
            <Field 
              type="number"
              id="ageRetired"
              name="ageRetired"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="contributionInitial" className=''>Aporte inicial</label>
            <Field 
              type="number"
              step="100"
              id="contributionInitial"
              name="contributionInitial"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="contributionRecurrent" className=''>Aporte mensal</label>
            <Field 
              type="number"
              step="100"
              id="contributionRecurrent"
              name="contributionRecurrent"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="retiredIncome" className=''>Renda esperada após aposentadoria</label>
            <Field 
              type="number"
              step="100"
              id="retiredIncome"
              name="retiredIncome"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="rentability" className=''>Rentabilidade anual</label>
            <Field 
              type="number"
              id="rentability"
              name="rentability"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500"
            />
          </div>
          <div className="flex justify-between w-full px-5 gap-5">
            <label htmlFor="inflaction" className=''>Inflação esperada anual</label>
            <Field 
              type="number"
              id="inflaction"
              name="inflaction"
              className="ring-1 ring-blue-300 rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 after:content-['%']"
            />
          </div>
          <button 
            type="submit"
            className="bg-green-500 rounded-md px-4 py-2 text-zinc-900 dark:text-zinc-50"
          >
              Calcular
          </button>
        <span className='h-4'>
          {
          calculated && `Até os ${data.ageRetired} anos, você terá acumulado: ${formataBRL(fvCalculated)}`
          }
          </span>
        
        </Form>
    </Formik>
      
    </div>
  )
}

export default App
