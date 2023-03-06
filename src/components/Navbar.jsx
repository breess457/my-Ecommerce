import React,{useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { UseContexts } from '../App'


export default function Navbar({...proptx}) {
  const {cartItems} = useContext(UseContexts)
  return (
    <>
        <nav className='relative flex flex-wrap items-center justify-between
                bg-white border border-gray-200 px-2 sm:px-4 mb-3 rounded'
        >
            <div className="container px-4 flex flex-row items-center justify-between mx-auto">
              <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <a className='flex items-center'>
                   <span className='self-center text-2xl font-semibold whitespace-nowrap'>ซื้อภาพยนตร์ ออนไลน์</span>
                </a>
              </div>
                
                <div className="lg:flex flex-grow items-center flex">
                    <ul className="flex flex-row p-4 mt-4 rounded-lg bg-gray-50 lg:flex-row lg:ml-auto">
                        <li>
                          <input 
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg 
                              focus:ring-blue-500 focus:border-blue-500 ml-auto
                              block w-full p-2 mr-6 mt-1' 
                              placeholder='ค้นหา'
                              value={proptx.Query}
                              onChange={(e)=>proptx.SetQuery(e.target.value)}
                          />
                        </li>
                        <li className='ml-4'>&nbsp;</li>
                        <li className="">
                            <button
                                className='text-white bg-blue-700 hover:bg-blue-800 font-medium  md:rounded-full lg:rounded-full
                                    text-lg px-5 py-2.5 text-center mr-2 mb-2
                                    focus:outline-none focus:ring-4 focus:ring-blue-300
                                '
                                onClick={()=> proptx.setShowCarts(true)}
                            >
                               <FontAwesomeIcon icon={faCartShopping} className="mr-2"/> ตะกร้า &nbsp;
                               <div className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900">{cartItems.length}</div>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}
