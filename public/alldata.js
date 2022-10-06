function AllData(){
  const [data, setData] = React.useState('');
  const {user, setUser} = React.useContext(UserContext)

  
  
  
  if(user == null){
    return(
      <Card
        bgcolor="danger"
        header= {(<img src="Images/Denied.png" className="img-fluid" alt="Responsive image"/>)}
        status="Please Sign In To Continue">
        </Card>
    )
  } else {
    return(
      <Card
        bgcolor="secondary"
        header="All User Data"
        body={
          <FetchData user={user} data={data} setData={setData}/>
        }>
      </Card>
    )
  }
}

function FetchData(props){
React.useEffect(() => {
  // fetch all accounts from API
  fetch(`/account/findOne/${props.user.email}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    props.setData(JSON.stringify(data));
  });
});

return (
  <div style={{color: "white"}}>
  <h5>Current user: {props.user.name}</h5>
  {props.data}
  </div>
);
}