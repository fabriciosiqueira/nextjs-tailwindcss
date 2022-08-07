import React, {useState} from "react";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import Router from 'next/router'

const validationPost = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    telefone1: yup.string().required(),
    telefone2: yup.string().required(),
    setor: yup.string().required(),
})

import Layout from "../components/Layout";
import Edit from "../public/svgs/edit-svgrepo-com.svg";
import Trash from "../public/svgs/trash-svgrepo-com.svg";
import api from "../service/api";
import Modal from "../components/Modal";

export default function Home({users}) {
    
    const [opneModal, setOpenModal] = useState(false)
    const [excluirId, setExcluirId] = useState(null)
    const [add, setAdd] = useState(false)

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(validationPost)
    });

    const onSubmit = async data => {
        let b = data
        let arr = []
        arr.push(b.telefone1)
        arr.push(b.telefone2)

        b.telefones = arr
        try {
            let res = await api.registrar(b)
            if (res.statusCode == 201) {

                console.log({res})
                //useHistory("/")
                setAdd(false)
                Router.reload(window.location.pathname)
            }
            setAdd(false)
       
        } catch (error) {
            console.log(error)
            //Router.reload(window.location.pathname)
        }
        
    };

    const handleAdd = () => {
        setAdd(true)
       
    }

    const handleCancel = () => {
        setAdd(false)
       

    }

    const handleDelete = async () => {

        await api.deletar(excluirId)
        Router.reload();  
    
    }

    const handleOpenModal = (id) => {
        setExcluirId(id)
        setOpenModal(true)
    }

    return (
        <>
            <Layout title="Funcionários">
                <h1 className="text-4xl mb8 text-center">
                Funcionários
                </h1>

                {add &&
                    <div className="bg-white mt-4 mb-4 p-4 mb-0 space-t-6 px-6 shadow rounded-lg sm:px-10">
                        <h2 className="text-2xl mb8 text-center">Cadastrar Funcionário</h2>
                        <form className="mb-0 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                            <div className="content-center  justify-around flex-row items-center  rounded-md">
                                <div>
                                    <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                        Nome
                                    </label>
                                    <input type="text" className="w-full border border-gray-300 px-3 py-2" name="nome"  placeholder="Nome" {...register("nome")} />    
                                    {errors.nome?.message && <p className="block text-xs font-medium text-red-700 px-1 py-1">CPF é um campo obrigatorio</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                        CPF
                                    </label>
                                    <InputMask type="text" mask="999.999.999-99" name="cpf"  className="w-full border border-gray-300 px-3 py-2"   placeholder="999.999.999-99" {...register("cpf")} />   
                                    {errors.cpf?.message && <p className="block text-xs font-medium text-red-700 px-1 py-1">CPF é um campo obrigatorio</p>}
                                </div>
                            
                                <div>
                                    <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                        Carteira de Trabalho
                                    </label>
                                    <InputMask type="text" mask="9999999" name="carteira_trabalho" className="w-full border border-gray-300 px-3 py-2"  placeholder="9999999" {...register("carteira_trabalho")} />
                                    {errors.carteira_trabalho?.message  &&<p className="block text-xs font-medium text-red-700 px-1 py-1">Carteira de trabalho é um campo obrigatorio</p>}
                                </div>

                                
                                <div>
                                    <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                        Telefone
                                    </label>
                                    <InputMask type="text" mask="(99) 99999-9999" name="telefone1" className="w-full border border-gray-300 px-3 py-2"   placeholder="(99) 99999-9999" {...register("telefone2")}  /> 
                                    {errors.telefone1?.message &&<p className="block text-xs font-medium text-red-700 px-1 py-1">Telefone é um campo obrigatorio</p>}
                                </div>

                                <div>
                                    <label  className="block text-sm font-medium text-gary-700 px-1 py-1">
                                        Telefone
                                    </label>
                                    <InputMask type="text" mask="(99) 99999-9999" name="telefone2" className="w-full border border-gray-300 px-3 py-2"   placeholder="(99) 99999-9999" {...register("telefone1")}  /> 
                                    {errors.telefone2?.message &&<p className="block text-xs font-medium text-red-700 px-1 py-1">Telefone é um campo obrigatorio</p>}
                                </div>
                                <div>
                                    <select  className="px-3 py-2 mt-2 w-full border border-gray-300" {...register("setor")}>
                                        <option value="Vendas">Vendas</option>
                                        <option value="Escritório">Escritório</option>
                                        <option value="Estoque">Estoque</option>
                                        <option value="Administrativo">Administrativo</option>
                                    </select>
                                </div>
                                
                                <div className="mb-4 mt-4 flex justify-around flex-row items-center">
                                    
                                    <a onClick={()=>handleCancel()} className="mt-2 content-center bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                                        Cancelar
                                    </a>
                                    <button className="mt-2 content-center bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded" type="submit" >Cadastrar</button>
                                </div>
                                
                            </div>
                            
                        </form>
                    </div>
                }

                <div className="mb-4 mt-4 flex justify-center flex-row items-center  rounded-md">
                    <button onClick={()=>handleAdd()} className="content-center bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                        Adicionar
                    </button>
                </div>

                {users.length > 0 ?
                    <ul
                        className="mt-4 mb-4 p-4"
                    >
                        {users.map((user, index) => {
                            return (
                                <li key={index}>
                                        <div className=" justify-around border p-4 border-gray my-2  flex items-center text-lg bg-gray-200 rounded-md">
                                        
                                            <p className="font-regular text-xs">
                                                <span
                                                className="mr-2 font-bold">CPF: </span>
                                                {user.cpf}
            
                                            </p>
                                            <p className="font-regular text-xs">
                                                <span
                                                className="mr-2 font-bold">nome: </span>
                                                {user.nome}
            
                                            </p>
                                            <p className="font-regular text-xs">
                                                <span
                                                className="mr-2 font-bold">Setor: </span>
                                                {user.setor}
            
                                            </p>
            
                                            <div>
                                                
                                                <a href={`/edit?id=${user.id}`} className="mx-3 hover:pointer" ><Edit className="w-30 h-30" /></a>
                                            
                                                
                                            </div>
                                            <div>
                                                <a className="mx-3  hover:pointer" onClick={()=>handleOpenModal(user.id)}><Trash className="w-30 h-30" /></a>
                                            </div>
                                        </div>
                                </li>
                            )
                        })}
                    </ul>
                :
                    <h3 className="text-2xl mb8 text-center">Nao ha itens a serem listados</h3>
                } 
            </Layout>
            {opneModal && <Modal close={()=>setOpenModal(false)} handleDelete={()=>handleDelete()} />}
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        const response = await api.list()
        const {users,statusCode} = response;
      
        if(statusCode == 200) {
            return {
                props:{users}
            
            }
       } 
      
    } catch (err) {
        //console.log(err);
        return {
            props:{users:[]}
        
        }
        
    }
}
