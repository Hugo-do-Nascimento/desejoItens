// import axios from "axios";

const getProducts = async () => {
    try {
        const response = await axios({
            method: "GET",
            url: "https://api.baserow.io/api/database/rows/table/330431/?user_field_names=true",
            headers: {
                Authorization: "Token mKMdr4cx6AfkNxUE1OyU5oWscOBJFJMy"
            }
        });
        if (response.status !== 200) {
            throw new Error("Erro ao buscar produtos")
        }
        
        return response.data;

    } catch (error) {
        console.error('Erro ao buscar por produtos:', error);
        return [];
    }
    
}

async function postProduct(nome, url_imagem, preco, url_produto) {
    const response = await axios({
        method: "POST",
        url: "https://api.baserow.io/api/database/rows/table/330431/?user_field_names=true",
        headers: {
            Authorization: "Token mKMdr4cx6AfkNxUE1OyU5oWscOBJFJMy",
            "content-type": "application/json"
        },
        data: JSON.stringify({
            nome: nome,
            preco: preco,
            url_imagem: url_imagem,
            url_produto: url_produto
        })
    });

    if (response.status !== 201) {
        throw new Error("Não foi possível adicionar o produto");
    }

    return response.data;
}

async function deleteProduct(id) {
    try {
        const response = await axios({
            method: "DELETE",
            url: `https://api.baserow.io/api/database/rows/table/330431/${id}/`,
            headers: {
                Authorization: "Token mKMdr4cx6AfkNxUE1OyU5oWscOBJFJMy"
            }
        });

        if(response.status !== 204) {
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
