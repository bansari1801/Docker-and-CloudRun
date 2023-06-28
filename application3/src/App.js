import './App.css';
import  React, {useEffect, useState} from "react";
import { getUserState } from './services/userData';

function App() {

  const [userData, setUserData] = useState([]);

  useEffect(() => {
     getUserState().then( res => {
      setUserData(res);
     });
  },[])
  
  //Reference: https://stackoverflow.com/questions/59277859/react-display-a-firestore-timestamp [12]
  const tableBodyData = () => {
    return userData.map((data,i) => {
      return (
        <tr key={i}>
              <td>{data.userName}</td>
              <td>{data.userEmail}</td>
              <td>{data.timestamp.toDate().toLocaleString()}</td>
              <td>{data.status}</td>
            </tr>
      )
    })
  }
  return (
    <div className="App">
      <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Last Logged In</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableBodyData()}
        </tbody>
      </table>
    </div>
  );
}

export default App;

