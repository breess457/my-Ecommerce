import { useState,useEffect,createContext } from 'react'
import Card from './components/Card'
import CartDrawer from './components/CartDrawer'
import Navbar from './components/Navbar'
import axios from 'axios'
import ModalPay from './components/ModalPay'
import DetailModal from './components/DetailModal'

export const UseContexts = createContext()

function App() {
  const [dataMovie,setDataMovie] = useState([])
  const [quey,setQuery] = useState("")
  const [isVisible,setIsVisible] = useState(false)

  const [isModalPay,setIsModalPay] = useState(false)
  const [isModalDetail,setIsModalDetail] = useState(false)
  const [isCurren,setIsCurren] = useState({})
   function handleModalDetail(data){
    setIsModalDetail(true)
    setIsCurren({...data})
   }

  const [showCart,setShowCart] = useState(false)
  const [cartItems,setCartItems] = useState(()=>{
    const addtoCart = localStorage.getItem("addCart")
    if(addtoCart){
      return JSON.parse(addtoCart)
    }else{
      return []
    }
  })


  useEffect(()=>{
    localStorage.setItem("addCart",JSON.stringify(cartItems))
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=6f90fc49a79e7765fa0571aa8eaf1bad&query=a')
      .then((res)=> setDataMovie(res.data.results))
      .catch(err => console.log(err))
     
  },[cartItems])


  return (
    <UseContexts.Provider value={{cartItems,setCartItems}}>
      <div className="App">
        <header className='fixed w-full top-0 z-50'>
          <Navbar setShowCarts={setShowCart} Query={quey} SetQuery={setQuery} />
        </header>
        <br/> <br/><br/>
        <br/> <br/><br/>
        <div className="p-5">
          
          <div className='' style={{overflowX:"hidden"}} >
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {dataMovie.filter((post)=>{
                if(quey === ""){
                  return post
                }else if(post.original_title.toLowerCase().includes(quey.toLowerCase())){
                  return post
                }
              }).map((res,i)=>(
                  <Card key={res.id} ID={res.id} name={res.original_title} 
                    result={res} price={res.vote_count} images={res.poster_path} 
                    index={i} handleModalDetail={handleModalDetail}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <CartDrawer 
          isShowCart={showCart} setIsModalPay={setIsModalPay} 
          setIsShowCart={setShowCart} 
          isVisible={isVisible} setIsVisible={setIsVisible}
        />
        {isModalPay ? <ModalPay setIsModalPay={setIsModalPay} 
          setIsVisible={setIsVisible} isVisible={isVisible}
        />: null}
        {isModalDetail ? <DetailModal isCurren={isCurren} setIsCurren={setIsCurren} setIsModalDetail={setIsModalDetail} />:null}
      </div>
    </UseContexts.Provider>
  )
}

export default App

/* 
              style={{
                listStyle:"none",
                maxWidth:"100%",
                height:"100%",
                overflowY:"auto",
                overflowX:"hidden"
              }} 
              */