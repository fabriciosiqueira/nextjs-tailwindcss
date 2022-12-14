import React from 'react';
import Head from "next/head";
import Image from "next/image";

const Layout = ({title, children}) => {
    return (
        <div className='bg-gray-300 p-6'>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className="container mx-auto mx-auto max-w-xl pt-4 min-h-screen">
                {children}
            </main>

           
        </div>
    );
};

export default Layout;
