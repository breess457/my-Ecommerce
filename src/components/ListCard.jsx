import { faTrash,faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useContext} from 'react'
import { UseContexts } from '../App'

export default function ListCard({...propts}) {

  return (
        <div className="mb-2">
            <div className="flow-root">
              <ul role={"list"} className="px-4 divide-y divide-gray-200">
                <li className='flex border'>
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={"https://image.tmdb.org/t/p/w500/"+propts.items.poster_path} className="h-full w-full object-cover object-center" />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between font-medium text-gray-900">
                        <h3 className=''  
                        >{propts.items.original_title}</h3>
                      </div>
                      <div className="flex">
                      <p className='mt-1 text-md text-gray-500'>ราคา {propts.items.vote_count}</p>
                      
                      </div>
                    </div>

                    <div className="flex flex-1 justify-between text-sm">
                      <p className="ml-4 mb-4 mt-1 bg-yellow-100 text-yellow-600 text-md font-medium mr-2 px-2.5 py-0.5 rounded">
                        <FontAwesomeIcon icon={faStar} /> {propts.items.vote_average}
                      </p>
                      <div className="flex mr-2 ml-auto">
                        <button type='button' 
                            className='font-medium rounded-full text-sm px-2.5 py-2.5 text-center'
                            onClick={()=>propts.removeProduct(propts.items)}
                        ><FontAwesomeIcon icon={faTrash} className="text-red-900" /></button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
        </div>
  )
}
