const baseApi = "http://localhost:4444";


export default {
    list: async () => {
        const req = await fetch(`${baseApi}/funcionarios`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const json = await req.json();
        
        return json;
    },
    funcionario: async (id) => {
        const req = await fetch(`${baseApi}/funcionarios/${id}`, {
            method: "GET",
            headers: {
               
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })

        const json = await req.json();
        
        return json;
    },
    registrar: async (b) => {

        const req = await fetch(`${baseApi}/funcionarios`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome:b.nome,
                cpf:b.cpf,
                carteira_trabalho:b.carteira_trabalho,
                telefones:b.telefones,
                setor:b.setor,
            }),
        })

        const json = await req.json();
        
        return json;
    },
    atualizar: async (id, b) => {

        const req = await fetch(`${baseApi}/funcionarios/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome:b.nome,
                cpf:b.cpf,
                carteira_trabalho:b.carteira_trabalho,
                telefones:b.telefones,
                setor:b.setor,
            }),
        })

        const json = await req.json();
        
        return json;
    },
    deletar: async (id) => {

        const req = await fetch(`${baseApi}/funcionarios/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            }
        })
        
        return;
    }

}