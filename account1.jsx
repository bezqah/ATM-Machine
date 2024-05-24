// this keeps a running total of deposits and withdrawals

const ATMDeposit = ({ onChange }) => {
  return (
    <label className="label huge">
      Deposit:
      <input type="number" onChange={onChange}></input>
      <input type="submit"></input>
    </label>
  );
};

const Account = () => {
  const [accountState, setAccountState] = React.useState(0);
  let deposit = accountState;
  const handleChange = event => {
    console.log(`handleChange ${event.target.value}`);
    deposit = Number(event.target.value);
  };
  const handleSubmit = (event) => {
    setAccountState(accountState+deposit); //adds the deposit amount to the current total in the account
    event.preventDefault();
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Account Balance ${accountState}</h2>
      <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
