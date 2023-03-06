import { faArrowUpRightFromSquare, faCheck, faHouseCircleCheck, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext, useEffect, useState} from 'react'
import { UseContexts } from '../App'

function ToolTip({children,texts}){
  return (
    <span className="group relative">
        <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 
          whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition
          before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4
          before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100"
        >{texts}</span>
        {children}
    </span>
  )
}

export default function Card({...proptx}) {
    const {cartItems,setCartItems} = useContext(UseContexts)
    const [status,setStatus] = useState(false)

    function handleAddProduct(dataitem){
      const ProductExit = cartItems.find((item)=>item.id === dataitem.id)
       if(ProductExit){
        setCartItems(cartItems.map((item)=>item.id === dataitem.id ?
        {...ProductExit,quantity:ProductExit.quantity + 1} : item))
       } else{
        setCartItems([...cartItems,{...dataitem,quantity:1}])
       }
    }
    useEffect(()=>{
      cartItems.forEach((resitem)=>{
        if(resitem.id === proptx.ID){
          setStatus(true)
        }
      })
    },[cartItems])
  return (
      <div className='w-full max-w-sm bg-white border border-gray-400 shadow rounded-lg'>
          
          <div>
            <img className='rounded-t-lg' src={"https://image.tmdb.org/t/p/w500/"+proptx.images} 
              style={{
                width:"100%",height:"300px",
                backgroundRepeat:"no-repeat",
                objectFit:"cover",
                backgroundAttachment:"fixed",
                backgroundSize:"cover"
              }} 
            />
          </div>
          <div className='px-5 pb-5'>
          
            <div className="flex items-center mt-2.5 mb-5">
              <a href="" className="justify-between" style={{
                    width:"100%",whiteSpace:'nowrap',
                    overflow:"hidden",textOverflow:"ellipsis"
                    
                  }}
              >
                <h5 
                  className='text-xl font-semibold text-gray-900'
                >
                    {proptx.name}
                </h5>
              </a>
            </div>
            <div className='flex items-center justify-between'>
                <span className='text-3xl font-bold text-gray-900'>฿ {proptx.price}</span>
                <div className='flex'>
                <button
                  className='mr-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-blue-300
                    font-medium rounded-full text-lg px-3.5 py-2.5 text-center'
                    onClick={()=>proptx.handleModalDetail(proptx.result)}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </button>
                {status ? (
                  <ToolTip texts={"สินค้านี้อยู่ในตะกร้าแล้ว"}>
                    <button
                      className='text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-blue-300 
                        font-medium rounded-full text-lg px-3.5 py-2.5 text-center'
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                  </ToolTip>
                ):(
                  <button
                    className='text-white bg-orange-600 hover:bg-orange-800 focus:outline-none focus:ring-blue-300 
                      font-medium rounded-full text-lg px-3.5 py-2.5 text-center'
                    onClick={()=>handleAddProduct(proptx.result)}
                  >
                      <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                )}
                
                </div>
            </div>
          </div>
      </div>
  )
}
