import React, {useCallback, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import InputMask from 'react-input-mask';
import { yupResolver} from "@hookform/resolvers/yup"
import Router from 'next/router'
import * as yup from "yup"

const validationPost = yup.object().shape({
    nome: yup.string().required(),
    cpf: yup.string().required(),
    telefone1: yup.string().required(),
    telefone2: yup.string().required(),
    setor: yup.string().required(),
})

import Link from "next/Link";
import Layout from "../components/Layout";
import api from "../service/api";

export default function edit ({user}) {
   // console.log({user});

   const [sucesso, setSucesso] = useState(false)

    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(validationPost)
    });
    const onSubmit = async data => {
        console.log(data)
        let b = data
        let arr = []
        arr.push(b.telefone1)
        arr.push(b.telefone2)

        b.telefones = arr
        try {
            let res = await api.atualizar(user.id, b)
            if (res.statusCode == 200) {

                console.log({res})
                //Router.reload(window.location.pathname)
                setSucesso(true)
            }
       
        } catch (error) {
            console.log(error)
           // Router.reload(window.location.pathname)
            //setAdd(false)
        }
    };
   
return (
        <Layout title="Funcionários">
            <h1 className="text-4xl mb8 text-center">
            Funcionários
            </h1>

                <div className="bg-white mt-4 mb-4 p-4 space-t-6 px-6 shadow rounded-lg sm:px-10">
                <h2 className="text-2xl mb8 text-center">Editar Cadastro</h2>
               
                <form className="mb-0 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
                    <div className="content-center  justify-around flex-row items-center  rounded-md">
                        <div>
                            <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                Nome
                            </label>
                            <input defaultValue={user.nome}  className="w-full border border-gray-300 px-3 py-2" required placeholder="Nome" name="nome" {...register("nome")} />    
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                CPF
                            </label>
                            <InputMask defaultValue={user.cpf}   mask="999.999.999-99"  className="w-full border border-gray-300 px-3 py-2"  required placeholder="999.999.999-99"  name="cpf" {...register("cpf")} />   
                        </div>
                       
                        <div>
                            <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                Carteira de Trabalho
                            </label>
                            <InputMask defaultValue={user.cpf}  mask="9999999" className="w-full border border-gray-300 px-3 py-2" required placeholder="9999999"  name="carteira_trabalho" {...register("carteira_trabalho")} />
                        </div>

                        <div>
                            <label  className="block text-sm font-medium text-gary-700 px-1 py-1">
                                Telefone
                            </label>
                            <InputMask defaultValue={user.telefones[0]}   mask="(99) 99999-9999" className="w-full border border-gray-300 px-3 py-2" required  placeholder="(99) 99999-9999"  name="telefone1" {...register("telefone1")}  /> 
                            
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gary-700 px-1 py-1">
                                Telefone
                            </label>
                            <InputMask defaultValue={user.telefones[1]}   mask="(99) 99999-9999" className="w-full border border-gray-300 px-3 py-2" required  placeholder="(99) 99999-9999"  name="telefone2" {...register("telefone2")}  /> 
                        </div>

                        <div>
                            <select defaultValue={user.setor} name="setor"  className="px-3 py-2 mt-2 w-full border border-gray-300" {...register("setor")}>
                                <option value="Vendas">Vendas</option>
                                <option value="Escritório">Escritório</option>
                                <option value="Estoque">Estoque</option>
                                <option value="Administrativo">Administrativo</option>
                            </select>
                        </div>
                        
                        <div className="mb-4 mt-4 flex justify-around flex-row items-center">
                            <Link href="/">
                                <a className="mt-2 content-center bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                                    Voltar
                                </a>
                            </Link>
                           
                            <input className="mt-2 content-center bg-green-600 hover:bg-green-400 text-white font-bold py-2 px-4 rounded" type="submit"  />
                        </div>
                        
                    </div>
                    
                </form>
                {sucesso && <p className="text-xs text-green-400 mb8 text-center"><em>Cadastro atulizado com sucesso</em></p>}
            </div>

        </Layout>
    )
}



export async function getServerSideProps({query}) {
    const { id } = query
    //console.log({id}); 
    try {
        const response = await api.funcionario(id)
        const user = await response;
        
        return {
            props: {user}
        } 
        return
    } catch (err) {
        console.log(err);
    }
}


