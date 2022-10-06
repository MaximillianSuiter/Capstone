function Login(){
  const [status, setStatus] = React.useState('');
  const {user, setUser} = React.useContext(UserContext)

  if(user != null){
    return(
      <Card
        bgcolor="success"
        header={`Welcome ${user.name} !`}
        status="Now you can make a deposit, withdrawal, or check your balance.">
        </Card>
    )
  }

  return (
    <Card
      bgcolor="info"
      header="Login"
      status={status}
      body={<LoginForm user={user} setUser={setUser} setStatus={setStatus}/>}
    />
  ) 
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handle(){
    fetch(`/account/login/${email}/${password}`)
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus('');
            console.log('JSON:', data);
            props.setUser(data)
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter Your Email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter Your Password" 
      value={password} 
      onChange={e => {
        setPassword(e.currentTarget.value)
        }}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
   
  </>);
}