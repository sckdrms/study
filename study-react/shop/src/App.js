import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
// import bg from './img/bg.png';
import { data, Main, Card, Detail, About } from './components/Data.js'
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Cart from './components/Cart'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'



function App() {

  let obj = {name: 'kim'}
  localStorage.setItem('data', JSON.stringify(obj))
  let 꺼낸거 = localStorage.getItem('data')
  console.log(JSON.parse(꺼낸거).name)

  let result = useQuery({
    queryKey: 'username',
    queryFn: () => axios.get('https://codingapple1.github.io/userdata.json').then((a) => a.data)
  })

  

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [buttonclick, setButtonclick] = useState(0)

  return (
    <div className="App">
      <Navbar data-bs-theme="dark" className='nav-color'>
        <Container>
          <Navbar.Brand href="/">Changgeun Shop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to={'/'} className='Navlink'>Home</Link>
            <Link to={'/detail'} className='Navlink'>Detail</Link> */}
            <Nav.Link onClick={()=>{navigate('/')}}>home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/about')}}>about</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>cart</Nav.Link>
          </Nav>
          <Nav className = 'ms-auto'>반가워요 {result.isLoading ? 'loading' : result.data.name} </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Main shoes={shoes}></Main>} />
        <Route path='/detail/:id' element={<Detail shoes={shoes}></Detail>} />
        <Route path='/about' element={<About></About>}>
          <Route path='member' element={<div>대표: 김창근</div>} />
          <Route path='skill' element={<div>트월킹 고수</div>} />
        </Route>
        <Route path='*' element={<div>없는 페이지랑께요</div>} />
        <Route path='/cart' element={<Cart></Cart>} />
      </Routes>
      
      <button onClick={()=>{ 
        axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
          let copy = [...shoes,...result.data]
          setShoes(copy)
          }
        )
        .catch(()=>{
          console.log('load fail')
        })
      }}>버튼</button>
      
      <button onClick={()=>{

      }}>보내기</button>

    </div>
  );

}


function FadeControl(){
  let [fade, setFade] = useState('')

}


export default App;
