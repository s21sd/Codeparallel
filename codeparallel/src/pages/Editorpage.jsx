import React, { useEffect, useRef, useState } from 'react'
import { FaLaptopCode } from "react-icons/fa";
import Client from '../component/Client';
import Editor from './Editor';
import { initSocket } from '../Socket';
import ACTIONS from '../../Actions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const Editorpage = () => {
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const location = useLocation();
    console.log(location.state)
    const [clients, setClients] = useState([])
    const roomId = useParams()

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            console.log(socketRef.current);
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));
            const handleErrors = (e) => {
                console.log('Socket error ', e);
                toast.error('Socket connection failed ,try again later');
                navigate('/')

            }
            // Emiting when a user Joined for the first time
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.userName
            });

            // Telling rest of the user that someone joined
            socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketid }) => {
                if (username !== location.state.userName) {
                    toast.success(`${username} joined the room.`)
                    console.log(username, ' joined')
                }
                setClients(clients)
            })


        }
        init();
    }, [])
    if (!location.state) {
        navigate('/')
    }
    console.log(clients);
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
                        <h1 className='font-bold text-white'>Connected</h1>
                        <div className='flex justify-between flex-wrap items-center gap-3'>
                            {
                                clients.map((client) => {
                                    return (
                                        <Client key={client.socketid} clientName={client.username} />
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
