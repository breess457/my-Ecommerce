import { faBahtSign } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext, useState} from 'react'
import { UseContexts } from '../App'
import ListCard from './ListCard'

export default function CartDrawer({...propt}) {
    const {cartItems,setCartItems} = useContext(UseContexts)

    function discountTotal(nums,priceall){
        if(nums > 2 && nums < 6 ){
            return '10%'
        }else if(nums > 5){
            return '20%'
        }else{
            return '0%'
        }
    }
    function priceToPay(priceall,productnumber){
        if(productnumber > 2 && productnumber < 6){
            return Math.floor( priceall * 0.9)
        }else if(productnumber > 5){
            return Math.floor(priceall * 0.8)
        }else{
            return priceall
        }
    }

    function removeProduct(dataitem){
        const ProductExit = cartItems.find((item)=>item.id === dataitem.id)
         if(ProductExit.quantity === 1){
          setCartItems(cartItems.filter((item)=> item.id !== dataitem.id))
         }else{
          setCartItems(
            cartItems.map((item)=> item.id === dataitem.id ? {...ProductExit,quantity:ProductExit.quantity -1} : item)
          )
         }
      }
      const totalPrice = cartItems.reduce((price,item)=>price + item.quantity * item.vote_count,0)

      function onPayment(){
        propt.setIsModalPay(true)
        propt.setIsVisible(!propt.isVisible)
      }
  return (
    <main 
        className={
            "fixed overflow-hidden top-0 z-50 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out" +
            (propt.isShowCart
                ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                : " transition-all delay-500 opacity-0 translate-x-full  "
            )
        }
    >
        <section
            className={
                "w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                (propt.isShowCart ? " translate-x-0 " : " translate-x-full")
            }
        >
            <article className="relative w-screen max-w-lg flex flex-col space-y-6 overflow-y-scroll h-full">
                <header className="px-2 pt-2">
                   <h2 className='font-bold text-xl mb-2'>จำนวนหนังในตะกร้า {cartItems.length} เรื่อง</h2>
                   <p className='ml-6'>* เมื่อซื้อหนังมากกว่า 3 รายการลด 10%, มากกว่า 5 รายการลด 20%</p>
                </header>
                <div style={{
                  listStyle:"none",
                  width:"100%",
                  height:"590px",
                  overflow:"auto",borderBottom:"4px solid gray"
                }}>
                    {cartItems.length === 0 && (
                        <div className=''> No Items are added.. </div>
                    )}
                    {cartItems.map((item,i)=>(
                        <ListCard key={i} items={item} removeProduct={removeProduct} />
                    ))}
                </div>
                <footer className='px-3'>
                  <div className='flex'>
                   <div>รวมราคาหนังทั้งหมด : {totalPrice} บาท</div>
                   <p className='ml-auto mr-2'>จำนวนหนัง : {cartItems.length} เรื่อง</p>
                  </div>
                  <div className='flex mt-2'>
                    <p className='mr-2 text-red-800'>ส่วนลด : {discountTotal(cartItems.length,totalPrice)}</p>
                    <p className='text-blue-700'>ราคาที่ต้องจ่าย : {priceToPay(totalPrice,cartItems.length)} บาท</p>
                    <button 
                      className='
                        ml-auto text-white bg-orange-400 hover:bg-orange-300 focus:ring-4 focus:outline-none
                        focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2'
                        onClick={onPayment}
                    ><FontAwesomeIcon icon={faBahtSign} className="mr-2" /> ขำระทั้งหมด</button>
                  </div>
                </footer>
            </article>
        </section>
        <section
            className=" w-screen h-full cursor-pointer "
            onClick={()=> propt.setIsShowCart(false)}
        >
        </section>
    </main>
  )
}
