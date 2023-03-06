import { faStar, faXmarkCircle,faShoppingCart,faCheck,faCartShopping, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImgMovie from '../assets/images/mo1.jpg'
import React, { useEffect, useState,useContext } from 'react'
import { UseContexts } from '../App'

export default function DetailModal({...propt}) {
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
            if(resitem.id === propt.isCurren.id){
              setStatus(true)
            }
          })
    },[cartItems])
  return (
    <>
      <div aria-hidden="true" tabIndex={-1} 
        className='justify-center items-center flex overflow-x-hidden 
        overflow-auto fixed inset-0 z-50 outline-none focus:outline-none
        md:h-full md:inset-0 h-modal p-4 w-full fixed'
      >
        <div className="relative w-full h-full max-w-5xl md:h-auto">
         <div className="relative bg-white rounded-lg shadow">
            <div className="p-2 space-y-6">
                <button style={{
                    position:"absolute",
                    top:"-24px",
                    right:"-10px",
                    fontSize:"36px",
                    color:"orange"
                  }}
                  onClick={()=>propt.setIsModalDetail(false)}
                > <FontAwesomeIcon icon={faXmarkCircle} /> </button>
                <div className="flex flex-col items-center bg-white rounded-lg md:flex-row md:max-w-5xl hover:bg-gray-100">
                    <img src={"https://image.tmdb.org/t/p/w500/"+propt.isCurren.poster_path} alt="" className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg' />
                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                        <p className='ml-auto mr-4 bg-yellow-100 text-yellow-600 text-md font-medium mr-2 px-2.5 py-0.5 rounded'>
                           <FontAwesomeIcon icon={faStar} /> {propt.isCurren.vote_average} คะเเนน
                        </p>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                         หนัง : {propt.isCurren.original_title}
                        </h5>
                        <div className="flex">
                            <p className='text-2xl mt-2 font-bold'>ราคา {propt.isCurren.vote_count} ฿</p>
                            
                            <div className='ml-4'>
                            {status ? (
                                <button
                                  className='text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-blue-300 
                                    font-medium rounded-full text-lg px-3.5 py-2 text-center'
                                >
                                   สินค้าอยู่ในตะกร้าแล้ว <FontAwesomeIcon icon={faCheckCircle} />
                                </button>
                            ):(
                                <button
                                   className='text-white bg-orange-600 hover:bg-orange-800 focus:outline-none focus:ring-blue-300 
                                     font-medium rounded-full text-lg px-3.5 py-2 text-center'
                                   onClick={()=>handleAddProduct(propt.isCurren)}
                                 >
                                    เพิ่มลงตะกร้า <FontAwesomeIcon icon={faShoppingCart} />
                                 </button>
                            )}
                            </div>
                        </div>
                        <p className='text-orange-500'>รายละเอียด</p>
                        <p className="mb-1 font-normal text-gray-600" style={{
                            height:"100px",maxWidth:"100%",listStyle:"none",
                            overflow:"auto"
                        }}>
                            {propt.isCurren.overview}
                        </p>
                        <div className="flex">
                            <p className="font-bold text-purple-500">วางขายเมื่อ : {propt.isCurren.release_date}</p>
                            <p className="ml-auto bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded">ภาษา : {propt.isCurren.original_language}</p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}
