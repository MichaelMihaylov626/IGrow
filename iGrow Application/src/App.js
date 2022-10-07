import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link as ReachLink, Route, Routes } from 'react-router-dom';
import { ChakraProvider, Input, Link } from '@chakra-ui/react';
import CountriesInfo from './components/CountriesInfo'

function App() {

  const [findCountry, setFindCountry] = useState("")
  const [countries, setCountries] = useState([])
  

  const onFindChange = (event) => {
    setFindCountry(event.target.value)
    console.log(event.target.value)
  }
  // to show countries after being filtered
  const countriesToShow = findCountry != "" ? countries.filter(c => 
    c.name.common.toLowerCase().includes(findCountry)) : []

  useEffect(() => {
  const promise = axios.get('https://restcountries.com/v3.1/all')
  promise
  .then(response=> {
      setCountries(response.data)
    })
  }, [])
  // 4bc72c7112c04849fcc7430d52eba260


  


  console.log(countries)
  return (
    <ChakraProvider>
    <>
    <nav>
      <ul>
        <li><Link as={ReachLink}>Play</Link></li>
        <li><Link as={ReachLink}>Shop</Link></li>
        <li><Link as={ReachLink} to='countries'>Countries</Link></li>
        <li><Link as={ReachLink}>Settings</Link></li>
        <li><Link as={ReachLink}>Quit</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="/countries" element= {<div>
      <div>
        find countries <Input placeholder='Find countries' value={findCountry}
                              onChange={onFindChange}/>
      </div>
      <CountriesInfo array = {countriesToShow}/>
    </div>}>
      </Route>
    </Routes>
    </>
    </ChakraProvider>
  );
}

export default App;
