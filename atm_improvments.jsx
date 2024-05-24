const ATMDeposit = ({ onChange, atmMode, isValid }) => {
return (
  <label className="label huge">
    <input id="number-input" type="number" width="200" onChange={onChange}></input>
    <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
    <p style={{color: "green"}}>{atmMode}</p>
  </label>
);
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const [errors, setErrors] = React.useState('');
  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if(event.target.value <= '0') { //dealing with negative numbers
      setErrors('Invalid! Must be a positive input')
      setValidTransaction(false);
    }
    else if(atmMode === "Cash Back" && event.target.value > totalState) {
      setErrors('Invalid! Cash back amount cannot exceed account balance')
      setValidTransaction(false);
      event.preventDefault();
    } 
    else {
      setValidTransaction(true)
      setErrors('');
      event.preventDefault();
    }
  };

  const handleSubmit = (event) => {
    setValidTransaction(true)
    let newTotal = isDeposit ? totalState+deposit : totalState-deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    setValidTransaction(true);
    setAtmMode(event.target.value) 
    if(event.target.value === "Deposit") {
      setIsDeposit(true);
    }
    else if(event.target.value === "Cash Back") {
      setIsDeposit(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select name="mode" id="mode-select" onChange={(e)=>handleModeSelect(e)}>
        <option id="no-selection" value=""></option>
        <option id="deposit-selection" value="Deposit" style={{color:"blue"}}>Deposit</option>
        <option id="cashback-selection" value="Cash Back" style={{color:"green"}}>Cash Back</option>
      </select>
      <div>{(atmMode === "Deposit" || atmMode === "Cash Back") ? <ATMDeposit 
      onChange={handleChange} atmMode={atmMode} isValid={validTransaction}></ATMDeposit> : null}</div>
      <div style={{color: 'red'}}>{errors}</div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
