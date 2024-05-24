const ATMDeposit = ({ onChange }) => { //child component
  return (
    <label className="label huge">
      Deposit:
      <input type="number" onChange={onChange}></input>
      <input type="submit" value="Submit"></input>
    </label>
  );
};

const Account = () => { //parent component
  let transactionState = 0; // state of this transaction
  let totalState = 0; // Account total at Bank
  let status = "Account Balance $zero";
  const handleChange = (event) => { 
    console.log(`handleChange ${event.target.value}`); //loads every time there is a change in the input field (func of onChange)
    transactionState = Number(event.target.value);
  };
  const handleSubmit = (event) => {
    totalState += transactionState;
    status = `Account Balance $${totalState}`;
    document.getElementById("total").innerHTML = status; //incorrect in react (can't detect changes from shadow DOM)
    event.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <ATMDeposit onChange={handleChange}> Deposit</ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
