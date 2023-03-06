import { faUniversity, faXmarkCircle,faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext, useState} from 'react'
import { UseContexts } from '../App'
import Countdown from './Countdown'

export default function ModalPay({...propt}) {
    const {cartItems} = useContext(UseContexts)
    
    const [peer,setPeer] = useState(false)
    console.log(peer)
    const totalPrice = cartItems.reduce((price,item)=>price + item.quantity * item.vote_count,0)
    function discountTotal(nums){
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
    function offPaayment(){
        propt.setIsModalPay(false)
        propt.setIsVisible(!propt.isVisible)
    }
  return (
    <>
      <div aria-hidden="true" tabIndex={-1} 
        className='justify-center items-center flex overflow-x-hidden 
        overflow-auto fixed inset-0 z-50 outline-none focus:outline-none
        md:h-full md:inset-0 h-modal p-4 w-full fixed'
      >
        <div className="relative w-full h-full max-w-xl md:h-auto">
            <div className="relative bg-white rounded-lg shadow">
                <div className="p-2 space-y-6">
                    <button style={{
                        position:"absolute",
                        top:"-24px",
                        right:"-10px",
                        fontSize:"36px",
                        color:""
                      }}
                      onClick={offPaayment}
                    > <FontAwesomeIcon icon={faXmarkCircle} /> </button>
                    <div className="flex flex-col">
                        <div className='w-full px-4 py-2'>
                            <div className='flex'>
                                <p className='font-bold text-3xl'>ชำระเงินทั้งหมด</p>
                                <p className='ml-auto font-bold text-3xl'>{propt.isVisible && <Countdown seconds={61} />}</p>
                            </div>
                            <div className='flex'>
                                <small className='ml-auto mr-3'>* หมายเหตุ กรุณาทำรายการภายในระยะเวลา 1 นาที</small>
                            </div>
                            <p className='text-md text-gray-500 mt-2 flex'>ราคาที่ต้องจ่าย <p className='ml-2 line-through font-bold text-gray-700'>{totalPrice} ฿</p></p>
                            <div className='flex mt-2 border-b'>
                                <p className='font-bold mb-2 text-3xl text-green-500'>฿ {priceToPay(totalPrice,cartItems.length)}</p>
                                <p className='ml-3 bg-red-100 hover:bg-red-200 font-bold text-red-800 text-md items-center mb-5 mt-1 mr-2 px-2.5 py-0.5 rounded border border-red-100'>
                                   ส่วนลด {discountTotal(cartItems.length)}
                                </p>
                                <p className='ml-auto font-bold text-xl mr-5 mt-2 items-center'>จำนวนหนัง {cartItems.length} เรื่อง</p>
                            </div>
                            <p className='text-md text-gray-500 mt-4'>ช่องทางชำระเงิน</p>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div 
                                  className={"w-full py-3 border text-center " +
                                  (peer ? null: "border-blue-600 text-blue-600")}
                                >
                                    <input defaultChecked={true} type={"radio"} onClick={()=>setPeer(false)} name="bordered-radio" className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label className='ml-2 text-lg font-medium text-gray-900'>Banking</label>
                                </div>
                                <div id='x-xl'
                                  className={"w-full py-3 border text-center " +
                                  (peer ? "border-blue-600 text-blue-600":null)}
                                >
                                    <input type={"radio"} onChange={()=>setPeer(true)} name="bordered-radio" className="w-4 h-4 mt-1 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                    <label className='ml-2 text-lg font-medium text-gray-900'>Paypal</label>
                                </div>
                            </div>
                            <div className='mt-4 py-4 border-t border-b'>
                                {peer ? (
                                  <div className="w-full h-56 m-auto rounded-xl relative text-dark shadow-2xl transition-transform transform">
                                    <div className="w-full px-8 absolute top-8">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className='font-light'>
                                                    Email
                                                </p>
                                                <p className="font-medium tracking-widest">
                                                    Ripper505jack@gmail.com
                                                </p>
                                            </div>
                                            <FontAwesomeIcon icon={faCreditCard} className="h-14 w-14" />
                                        </div>
                                        <div className="pt-3">
                                            <p className="font-light">
                                                phone Number
                                            </p>
                                            <p className="font-medium tracking-more-wider">
                                                085-839-2276
                                            </p>
                                        </div>
                                    </div>
                                  </div>
                                ):(
                                  <div 
                                    style={{
                                        backgroundImage:"linear-gradient(to right, #4da6ff, #0066cc)"
                                    }}
                                    className="w-full h-56 m-auto rounded-xl relative text-white shadow-2xl transition-transform transform">
                                    
                                    <div className="w-full px-8 absolute top-8">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className='font-light'>
                                                    ชื่อ
                                                </p>
                                                <p className="font-medium tracking-widest">
                                                    Muhammad Sobri Mama
                                                </p>
                                            </div>
                                            <FontAwesomeIcon icon={faUniversity} className="h-14 w-14" />
                                        </div>
                                        <div className="pt-3">
                                            <p className="font-medium tracking-more-wider">
                                               ธนาคาร กรุงไทย
                                            </p>
                                        </div>
                                        <div className="pt-3">
                                            <p className="font-light">
                                                เลขบัญชี
                                            </p>
                                            <p className="font-medium tracking-more-wider">
                                                4642  3489  9867  7632
                                            </p>
                                        </div>
                                        
                                    </div>
                                  </div>
                                )}
                                
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

/* 
<div className="flex items-start justify-between p-4 border-b rounded-t">
                    <h3 className="text-xl font-semibold text-gray-900">
                        ชำระเงินทั้งหมด {cartItems.length} เรื่อง
                    </h3>
                    <button 
                      className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 
                        hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center"
                      
                    >
                        <FontAwesomeIcon icon={faXmarkCircle} />
                    </button>
                </div>
<div style={{
                          listStyle:"none",
                          width:"60%",
                          height:"400px",
                          overflow:"auto",borderRight:"4px solid gray"
                        }}>
                         <table className='w-full'>
                            <tbody>
                                {cartItems.map((item,i)=>(
                                  <tr key={item.id}
                                    className="bg-white border hover:bg-gray-50"
                                  >
                                    <th scope='row' className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap'>
                                        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                            style={{
                                                width:"50px",
                                                height:"50px"
                                            }}
                                        />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">
                                                {item.original_title}
                                            </div>
                                            <div className="font-normal text-gray-500">
                                                ราคา {item.vote_count} บาท
                                            </div>
                                        </div>
                                    </th>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div> */
