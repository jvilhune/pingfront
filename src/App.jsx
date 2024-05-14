import React, { useState, useEffect } from 'react'
//import { Button } from 'semantic-ui-react'
import axios from 'axios'
import { apiBaseUrl } from './constants'

//import AddRecordForm, { RecordFormValues } from './AddRecordForm';

const App = () => {
  const [messagestate, setMessagestate] = useState('')

  useEffect(() => {
    let abortController = new AbortController()
    let aborted = abortController.signal.aborted

    /* Seuraava rivi kommentteihin jos ei haluta lukea backendilta 10 s valein buttontiloja */
    const interval = setInterval(() => {
  
    const sendPing = async () => {
      try {
        const {data: messageFromApi} = await axios.get(
          //'https://www.jvrecords.fi/recback/api/ping'
          `${apiBaseUrl}/ping`
        );

        aborted = abortController.signal.aborted;
        if (aborted === false) {
          console.log('messageFromApi', messageFromApi)
          setMessagestate(messageFromApi)
        }
      }
      catch (e) {
        console.error(e)
      }
    };

    sendPing()

    /* Seuraavat 2 rivia kommentteihin jos ei haluta lukea backendilta 10 s valein buttontiloja */
    }, 10000)
    //return () => clearInterval(interval)

    return () => {
      abortController.abort()
      clearInterval(interval)
    }
  }, []);

  const onButtonPing = () => {
    console.log('ping is called with a button ...')
    axios
      .get(`${apiBaseUrl}/ping`)
      //.get('https://www.jvrecords.fi/recback/api/ping')
      .then(response => {
        console.log('... response.data', response.data)
      })
  }

  return (
    <div>
    <table>
    <thead>
    </thead>
    <tbody>
    <tr>
    <td><b>Send Ping</b></td>
    </tr>
    <tr>
    {/* <td><Button color="green" onClick={onButtonPing}>Send Ping</Button></td> */}
    <td><button onClick={onButtonPing}>Send Ping</button></td>
    </tr>
    <tr>
    <td>{messagestate}</td>
    </tr>
    </tbody>
    <tfoot>
    </tfoot>
    </table>
    <br />
    </div>
  )
}

export default App