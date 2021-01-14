import React, { useState, useEffect } from 'react';
import axios from 'axios';

//useEffect hook-> allows us to write out some code that detects other components is rerendering and some piece (ex-state piece) of information have changed. useEffect hook allows Search component to run some code when the functional component is first rendered or re-rendered or when something else happens (lifecycle).
//we can configure useEffect to run some code automatically. There are three ways we can configure useEffect and this configuratons will determine when we will execute a piece of code: 

//Configuration #1 - run some code when the functional component is rendered for the 1st time only. This will cause that particular code to run one time only. ([] as 2nd parameter)

//Configuration #2 - run some code when the functional component is rendered for the 1st time and whenever it re-renders. (no array as 2nd parameter)

//Configuration 3 - run some code when the functional component is rendered for the 1st time and (whenever it re-renders + some piece of data has changed). ([value or variable] as 2nd parameter)


const Search = () => {

  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);


  useEffect(() => {
    //make request to api
    const search = async () => {
    //take out data from response
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: term
        }
      });

      setResults(data.query.search);
    };

    //run search if term is not an empty string
    //use setTimeout() to put a timer after user stop typing and a search is made. Any time there is an additional input changes cancel the previous timer. Each setTimeout has an unique id. Use id inside the clearTimeout() to stop the previous timer
    //if timer runs out we will initiate the search() and get the data

    const timeoutId = setTimeout(() => {
      if (term) {
        search();
      }
    }, 500);

    //with useEffect we are allow to only return a function. This function when return will do a CLEAN-UP! React will save this return ClEANUP function for the next useEffect call. When useEffect is called again, the CLEANUP function is called automatically due to being saved in the react from the initial useEffect call when the component was rendered for the 1st time. Then this useEffect will call its callback function again, and saving the CLEANUP function for the next useEffect call.
   
    //User will write on the input and initiate a timer & make react save the returned CLEANUP function for the next time the user type something again
    //When user types again, CLEANUP is called and timer is cleared, then another fresh timer with the same time is called again and a new CLEANUP function is saved again in the React for another input change.
    
    return () => {
      clearTimeout(timeoutId);
    };
    
  },[term]);


  const renderedResults = results.map((result) => { 
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
            </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          {/* to turn the data string into jsx. Do not use app can be possibly hack */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {/* {result.snippet} */}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  )
};



export default Search;