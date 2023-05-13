import { useRef, useState } from "react";
import "./App.css";
import { useFormik } from "formik";
import { fv, realTax, nper, taxYearToMonth } from "./utils/financials";
import { formataBRL } from "./utils/formatCurrency";
import { MdOutlineLightMode, MdModeNight } from "react-icons/md";
import { RxDividerVertical } from "react-icons/rx";
import { InputNumber } from "primereact/inputnumber";
import { Button } from 'primereact/button';


function App() {
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState({});
  const [data, setData] = useState({});
  const [retiredDuration, setRetiredDuration] = useState(0)
  const [retiredAge, setRetiredAge] = useState(0)
  const divRoot = useRef(null);

  function switchTheme() {
    divRoot.current.classList.toggle("dark");
  }

  const formik = useFormik({
    initialValues: {
      ageCurrent: 30,
      ageRetired: 65,
      contributionRecurrent: 1500,
      contributionInitial: 20000,
      retiredIncome: 5000,
      rentability: 10,
      inflaction: 5,
    },
    onSubmit: (values) => {
      let decimalRentability = values.rentability / 100;
      let decimalInflaction = values.inflaction / 100;
      let taxLiquid = realTax(decimalRentability, decimalInflaction);
      let numberOfPeriods = values.ageRetired - values.ageCurrent;
      let currentPayments = values.contributionRecurrent;
      let initialPatrimonialValue = values.contributionInitial;
      let retiredIncome = values.retiredIncome
      
      let fvCalc = fv(taxYearToMonth(taxLiquid), numberOfPeriods*12, currentPayments, initialPatrimonialValue)
      let nperCalc = nper(taxYearToMonth(taxLiquid), fvCalc, retiredIncome, 0)
            
      setData(values);
      setCalculated(true);
      setRetiredAge(formik.values.ageRetired)
      setResults({
        fvCalc,
        nperCalc
      });
      setRetiredDuration(Math.floor(nperCalc / 12))

      setTimeout(() => document.activeElement.blur(), 200)
    },
  });

  return (
    <div className="grid place-content-center h-screen bg-zinc-500" ref={divRoot}>

    <form
      className="flex flex-col w-[700px] items-center text-center border-2 border-blue-200 bg-zinc-50 dark:text-white dark:bg-zinc-800 rounded-md gap-3 p-5"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex justify-end self-start ml-5 rounded-sm p-1 ring-1 ring-slate-400">
        <MdOutlineLightMode onClick={switchTheme} className="cursor-pointer" />
        <RxDividerVertical />
        <MdModeNight onClick={switchTheme} className="cursor-pointer" />
      </div>

      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="ageCurrent" className="">Idade atual</label>
        <InputNumber
          id="ageCurrent"
          name="ageCurrent"
          min="0"
          max="120"
          value={formik.values.ageCurrent}
          onValueChange={(e) => {formik.setFieldValue("ageCurrent", e.value)}}
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="ageRetired" className="">Idade para começar a viver de renda</label>
        <InputNumber
          id="ageRetired"
          name="ageRetired"
          min="0"
          max="120"
          value={formik.values.ageRetired}
          onValueChange={(e) => {formik.setFieldValue("ageRetired", e.value)}}
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="contributionInitial" className="">Patrimônio acumulado</label>
        <InputNumber
          id="contributionInitial"
          name="contributionInitial"
          value={formik.values.contributionInitial}
          onValueChange={(e) => {formik.setFieldValue("contributionInitial", e.value)}}
          mode="currency"
          currency="BRL"
          showButtons
          step="1000"
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="contributionRecurrent" className="">Aporte mensal</label>
        <InputNumber
          id="contributionRecurrent"
          name="contributionRecurrent"
          value={formik.values.contributionRecurrent}
          onValueChange={(e) => {formik.setFieldValue("contributionRecurrent", e.value)}}
          mode="currency"
          currency="BRL"
          showButtons
          step="1000"
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="retiredIncome" className="">Renda esperada após aposentadoria (mensal)</label>
        <InputNumber
          id="retiredIncome"
          name="retiredIncome"
          value={formik.values.retiredIncome}
          onValueChange={(e) => {formik.setFieldValue("retiredIncome", e.value)}}
          mode="currency"
          currency="BRL"
          showButtons
          step="1000"
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
       <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="rentability" className="">Rentabilidade esperada (anual)</label>
        <InputNumber
          id="rentability"
          name="rentability"
          value={formik.values.rentability}
          onValueChange={(e) => {formik.setFieldValue("rentability", e.value)}}
          suffix="%"
          showButtons
          step=".1"
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      
      <div className="flex justify-between w-full px-5 gap-5">
        <label htmlFor="inflaction" className="">Inflação esperada (anual)</label>
        <InputNumber
          id="inflaction"
          name="inflaction"
          value={formik.values.inflaction}
          onValueChange={(e) => {formik.setFieldValue("inflaction", e.value)}}
          suffix="%"
          showButtons
          step=".1"
          className="rounded text-center outline-none focus:shadow-sm focus:shadow-cyan-400 dark:bg-zinc-500 w-1/3"
        />
      </div>
      <Button
        type="submit"
        label="Calcular"
        className=" overflow-hidden px-4 py-2 text-zinc-900 dark:text-zinc-50"
      />
      <div className="h-16">
        {calculated &&
          <span className="block text-start max-w-full">
            Até os {data.ageRetired} anos, você terá acumulado: <span className="font-bold">{formataBRL(results.fvCalc)}</span>. <br/>
            Você poderá receber o valor de {formataBRL(formik.values.retiredIncome)} mensalmente por aproximadamente <span className="font-bold">{retiredDuration} anos. </span>
            Você terá {retiredAge + retiredDuration} anos de idade.
          </span>
        }
      </div>
    </form>
    </div>
  );
}

export default App;
