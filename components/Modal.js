import React from 'react';

function Modal({close, handleDelete}) {
    return (
        <div className="bg-zinc-200 opacity-80  fixed inset-0 z-50">
            <div className="flex h-screen justify-center items-center" >
                <div className="flex-col justify-center bg-white py-2 px-4 border-4 border-gray-200 rounded-xl">
                    <div className="flex text-lg text-zinc-600 mb-10">Você desseja realmente exlcuir esse item ?</div>
                    <div className='flex flex-row justify-around'>
                        <button className="content-center bg-gray-600 hover:bg-gray-300 text-white font-bold py-2 px-4 rounded" onClick={()=>close()}>Não</button>
                        <button className="content-center bg-red-600 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" onClick={()=>handleDelete()}>Sim</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Modal;