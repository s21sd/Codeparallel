import React, { useEffect, useRef, useState } from 'react';
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
    const [clients, setClients] = useState([]);
    const roomId = useParams();

    useEffect(() => {
        const handleErrors = (e) => {
            console.log('Socket error ', e);
            toast.error('Socket connection failed ,try again later');
            navigate('/');
        };

        const init = async () => {
            try {
                socketRef.current = await initSocket();

                socketRef.current.on('connect_error', handleErrors);
                socketRef.current.on('connect_failed', handleErrors);
                socketRef.current.emit(ACTIONS.JOIN, {
                    roomId: roomId,
                    username: location.state?.userName
                });

                // Telling rest of the users that someone joined
                socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketid }) => {
                    if (username !== location.state.userName) {
                        toast.success(`${username} joined the room.`);
                    }
                    setClients(clients);
                });
            } catch (error) {
                handleErrors(error);
            }
        };

        init();
    }, [navigate, roomId, location.state]);

    if (!location.state) {
        navigate('/');
    }

    return (
        <div className='flex justify-between fixed'>
            <div className='w-[15vw] h-[100vh] bg-black p-4 flex flex-col justify-between fo'>
                <div className=''>
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <FaLaptopCode size={40} color='white' />
                        </div>
                        <div className=''>
                            <p className='font-bold text-sm text-white'>Code Parallel</p>
                            <p className='text-[10px] text-[#9CB1F0]'>Realtime Collaboration</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-bold text-white'>Connected</h1>
                        <div className='flex justify-between flex-wrap items-center gap-3'>
                            {clients.map((client) => (
                                <Client key={client.socketid} clientName={client.username} />
                            ))}
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
    );
};

export default Editorpage;
