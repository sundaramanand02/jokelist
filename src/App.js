import {React,useState} from 'react'
import axios from 'axios'

const App = () => {
  const [joke, setjoke] = useState('');
  // let jokeList=[];
  const [jokeList, setjokeList] = useState([]); 
  const getJoke=()=>{
    let list=jokeList;
    axios.get('https://official-joke-api.appspot.com/random_joke')
    // .then((res)=>console.log(res))
    .then((res)=>{setjoke(`${res.data.setup} ${res.data.punchline}`);})
    .catch((err)=>console.log(err));
    list.push(joke);
    setjokeList(list); 
    // jokeList.map((joke)=>console.log(joke));
  }
  return (
    <div>
    <div>App</div>
    <button onClick={getJoke}>Click here to get a free Joke</button> 
    <div>
      {jokeList.length}
      {jokeList.length>0?
      jokeList.map((joke)=><div>{joke}</div>):
      <div>No Jokes here</div>
      }
    </div>
    </div>
  )
}

export default App