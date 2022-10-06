function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const {user, setUser} = React.useContext(UserContext)

  
  
  
  if(user == null){
    return(
      <Card
        bgcolor="danger"
        header= {(<img src="Images/Denied.png" className="img-fluid" alt="Responsive image"/>)}
        status="Please Sign In To Continue">
        </Card>
    )
  }

  return (
    <Card
      bgcolor="warning"
      header="Make A Deposit"
      status={status}
      body={show ? 
        <DepositForm user={user} setUser={setUser} setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg user={user} setUser={setUser} setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Make Another Deposit?
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState('');

  function handle(){
    fetch(`/account/update/${props.user.email}/${amount}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`$${amount} has been added to ${data.value.name}'s account!`);
            props.setUser(data.value)
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
        }
    });
  }

  return(<>
      
    Deposit Amount:<br/>
    <input type="number"
      min="0"
      className="form-control" 
      placeholder="0.00" 
      value={amount}
      onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}