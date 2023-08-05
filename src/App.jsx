import React, {useState, useEffect} from 'react';
import './App.css';
import { Form } from 'semantic-ui-react'
import { Card,Image } from 'semantic-ui-react'


function App() {
  const [name,setName]=useState('');
  const [userName,setUserName]=useState('');
  const [avatar,setAvatar]=useState('');
  const [userInput,setUserInput]=useState('');
  const [userURL,setUserURL]=useState('');
  const [error,setError]=useState('');
  
  const accessToken = import.meta.env.VITE_REACT_APP_GITHUB_ACCESS_TOKEN;

  useEffect(()=>{
    const headers = {
      Authorization: `token ${accessToken}`,
    };


    fetch(`https://api.github.com/users/example`)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  },[])

  const setData = ({
    name,
    login,
    avatar_url,
    html_url,
  }) =>{
    setName(name);
    setUserName(login);
    setAvatar(avatar_url);
    setUserURL(html_url);

  }
  
  const HandleSearch = (e) => {
    setUserInput(e.target.value)
  }

  const HandleSubmit = () => {
    console.log('User Input:', userInput);
    console.log('Access Token:', accessToken);
  
    fetch(`https://api.github.com/users/${userInput}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

 return(
  <div>
    <div className="navbar">
      <p className="name">GitSearch</p>
    </div>
    <div className="component">
    <div className="search">
    <Form onSubmit={HandleSubmit}>
          <Form.Group>
            <Form.Input placeholder='Enter Username'name='name' onChange={HandleSearch}/>
            <Form.Button content='Submit' />
          </Form.Group>
    </Form>
    </div>

    <div className="card">
    <Card>
    <Image src={avatar} />
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Header>{userName}</Card.Header>
    </Card.Content>
    <Card.Content extra>
    <a href={userURL} target='_blank'>
      View Profile on Github
    </a>
   </Card.Content>
  </Card>
    </div>
    </div>
  </div>
 )
}

export default App
