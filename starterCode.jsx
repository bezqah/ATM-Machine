
const ATMDeposit = ({ onChange, isDeposit, totalState, deposit }) => {
  const choice = ["Deposit", "Cash Back"]; //true = 1; false = 0
  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      Deposit:
      <input type="number" onChange={onChange}></input>
      <input type="submit" value="submit"></input>
    </label>
  );
};


const Account = ({choice}) => {
let deposit = 0;
const [totalState, setTotalState] = React.useState(0); //initialization will only occur on first render
const [isDeposit, setIsDeposit] = React.useState(true);
const [errors, setErrors] = React.useState({
  depositError: '',
  cashBackError: '' 
})
let status = `Account Balance $ ${totalState}`; //define status up here because down below will be overwritten
console.log('Account Rendered');
const handleChange = event => {
  console.log(`handleChange ${event.target.value}`);
  deposit = Number(event.target.value);
};
const handleSubmit = (event) => {
  if(!isDeposit && deposit > totalState) {
    setErrors({cashBackError: 'Cash back amount must be no greater than account balance'})
    console.log("Invalid");
    event.preventDefault();
  } 
  else {
    let newTotal = isDeposit ? totalState+deposit : totalState-deposit;
    setTotalState(newTotal);
    event.preventDefault();
  }
  
};
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <button onClick={()=>setIsDeposit(true)}>Deposit</button>
      <button onClick={()=>setIsDeposit(false)}>Cash Back</button>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit}> Deposit</ATMDeposit>
      <div style={{color: 'red'}}>{errors.cashBackError}</div>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
