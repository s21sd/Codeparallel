import { Button } from 'bootstrap';
import React, { useState } from 'react'
import { FaLaptopCode } from "react-icons/fa";
import Client from '../component/Client';
import Editor from './Editor';
const Editorpage = () => {
    const [clients, setClients] = useState([])
    return (
        <div className='flex justify-between fixed'>
            <div className='w-[15vw] h-[100vh] bg-black p-4 flex flex-col justify-between fo'>
                <div className=''>

                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <FaLaptopCode size={40} color='white' />
                        </div>
                        <div className=''>
                            <p className=' font-bold text-sm text-white'>Code Parallel</p>
                            <p className='text-[10px]  text-[#9CB1F0]'>Realtime Collaboration</p>
                        </div>
                    </div>
                    <div>
                        {/* Connected */}
                        <h1 className='font-bold '>Connected</h1>
                        <div className='flex justify-between flex-wrap items-center gap-3'>
                            {
                                clients.map((client) => {
                                    return (
                                        <Client key={client.socketID} clientName={client.clientName} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
                <div className='grid gap-3'>
                    <button className='bg-[#9CB1F0] text-white p-2 rounded-xl'>Copy ROOM ID</button>
                    <button className='bg-white text-black p-2 rounded-xl'>Leave</button>
                </div>


            </div>
            <div className='w-[90vw] bg-purple-100'>
                <Editor />
            </div>

        </div>
    )
}

export default Editorpage
