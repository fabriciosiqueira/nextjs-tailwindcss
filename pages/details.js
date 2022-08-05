import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/Link';

export default function details ({pokeman}) {
    return (
        <Layout title={pokeman.name}>
            <h1 className="text-4xl mb2 text-center capitalize">
                {pokeman.name}
            </h1>
            <img className='mx-auto' src={pokeman.image} alt={pokeman.name}/>
            <p><span className="font-bold mr-2">Weight: </span> {pokeman.weight}</p>
            <p><span className="font-bold mr-2">height: </span> {pokeman.height}</p>
            <h2 className='text-2xl mt-6 mb-2'>Types</h2>
            {pokeman.types.map((type, index) => { 
                return <p key={index} className=''>{type.type.name}</p>
            })}
            <p className='mt-10 text-center'>
                <Link href="/">
                    <a  className="text-2xl underline">
                        Voltar
                    </a>
                </Link>
            </p>

        </Layout>
    )
}

export async function getServerSideProps({query}) {

    const {id} = query;

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokeman = await res.json();
        const paddedIndex = ("00"+id).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        
        pokeman.image = image;
       
        return {
            props: {pokeman}
        }

    } catch (err) {
        
    }

}