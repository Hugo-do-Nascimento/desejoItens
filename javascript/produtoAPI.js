const urlApi = "http://localhost:3000/produtos";

async function getProducts() {
    try {
        const response = await fetch(urlApi);
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos")
        }
        const products = await response.json();
        
        return products;

    } catch (error) {
        console.error('Erro ao buscar por produtos:', error)
    }
    
}

async function postProduct(nome, urlImagem, preco, urlProduto) {
    const response = await fetch(urlApi, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            urlImagem: urlImagem,
            urlProduto: urlProduto
        })
    });

    if (!response.ok) {
        throw new Error("Não foi possível adicionar o produto");
    }

    const products = await response.json();
    return products;
}

async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE'
        });

        if(!response.ok) {
            throw new Error('Erro ao deletar produto');
        }

        document.querySelector(`[data-id="${id}"]`).closest('.card').remove();
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
}

export const produtoAPI = {
    getProducts,
    postProduct,
    deleteProduct,
}
