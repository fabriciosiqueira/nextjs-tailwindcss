import React, {useEffect, useState} from "react";

import Link from "next/Link";
import Layout from "../components/Layout";

export default function Home({users}) {
    //console.log({pokemon});
    const [editar, setEditar] = useState(false)
    const [excluir, setExcluir] = useState(false)
    const [add, setAdd] = useState(false)


    useEffect(() => {
        console.log({editar});
    },[editar])


   
    return (
        <Layout title="Funcionários">
            <h1 className="text-4xl mb8 text-center">
            Funcionários
            </h1>

            {add &&
                <></>
            }

            {editar &&
                <></>
            }

        
            <ul>
                {users.map((user, index) => {
                    return (
                        <li key={index}>
                                <div className=" justify-around border p-4 border-gray my-2  flex items-center text-lg bg-gray-200 rounded-md">
                                 
                                    <p className="font-regular text-sm">
                                        <span
                                        className="mr-2 font-bold">CPF: </span>
                                        {user.cpf}

                                    </p>
                                    <p className="font-regular text-sm">
                                        <span
                                        className="mr-2 font-bold">nome: </span>
                                        {user.nome}

                                    </p>
                                    <p className="font-regular text-sm">
                                        <span
                                        className="mr-2 font-bold">Setor: </span>
                                        {user.setor}

                                    </p>
                                    
                                    <div
                                       className="w-300 flex-col justify-between align-center mx-3"
                                    >
                                        <a className="mx-3" onClick={()=>setEditar(!editar)}>E</a>
                                        <a>E</a>
                                    </div>
                                   
                                  
                                </div>
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
}

export async function getStaticProps(context) {
    try {
        const url ="http://localhost:4444/funcionarios";
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
              
            },
           // body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
        const {users} = await response.json();
        //let funcionarios = results
        console.log(users);
        return {
            props: {users}
        }

    } catch (err) {
        console.log(err);
    }
}
