import React, {useEffect, useState} from 'react';
import {makeApiClient} from './lib/api'

let apiClient = makeApiClient('https://api.github.com')

function App() {
  let [user, setUser] = useState(null)
  let [loading, setLoading] = useState(true)
  let [error, setError] = useState(null)
  let [repo, setRepo] = useState([])

  useEffect(() => {
      apiClient.fetchJSON('/users/juliatalashova').then(user =>{
        setUser(user)
        setLoading(false)
      })
        .catch(error => setError(error))
  },[])

  useEffect(() => {
    let rep;
    apiClient.fetchJSON('/users/juliatalashova/repos')
      .then(repo => {
        setRepo(repo)
        setLoading(false)
    })
      .catch(error => setError(error))
  },[])

  if(error) {
    return <Error error={error} />
  }

  if(loading) {
    return <Loading />
  }

  return (
    <div className="App">
      <h3>GitHub profile</h3>
      <img width="150px" src={user.avatar_url} alt="avatar"/>
      <h5>{user.name}</h5>
      <div>{user.bio}</div>
      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <h6>My repos</h6>
      <pre>
        <code>{JSON.stringify(repo.map(el => el.name), null, 2)}</code>
      </pre>
    </div>
  );
}
export default App;

function Loading() {
    return <div>
      Loading...
    </div>
}
function Error(error) {
  return <div>{String(error)}</div>
}
