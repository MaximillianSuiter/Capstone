function Balance(){
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
      bgcolor="info"
      header="Your Balance"
      status={status}
      body={
        <BalanceMsg user={user} setStatus={setStatus} status={status}/>}
      />
  )

}

function BalanceMsg(props){
  fetch(`/account/findOne/${props.user.email}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus(`There are $${data.balance} in ${data.name}'s account!`);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Check failed')
            console.log('err:', text);
        }
    });


  return(<>
    
  </>);
}
