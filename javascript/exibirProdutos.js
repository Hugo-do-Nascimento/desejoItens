import { produtoAPI } from "./produtoAPI.js";

const lista = document.querySelector("[data-lista]");

export function constroiCard(nome, url_imagem, preco, url_produto, id) {
    const card = document.createElement("div");
    
    card.className = "card";
    card.innerHTML = 
        `
            <img class="imagemCard" src="${url_imagem}" alt="Produto">
            <p class="nomeProduto" data-urlProduto="${url_produto}">${nome}</p>
            <div class="footerCard">
                <p class="preco">R$<span class="valor">${preco}</span></p>
                <img class="iconeLixeira" src="/imagens/trash-2.svg" alt="Icone - Lixeira" data-id="${id}">
            </div>
        `

    card.querySelector(".nomeProduto").addEventListener("click", () => {
        console.log(url_produto);
        window.location.href = url_produto;
    });

    card.querySelector(".iconeLixeira").addEventListener("click", async (evento) => {
        const id = evento.target.dataset.id;
        await produtoAPI.deleteProduct(id);
        card.remove();
    })

    return card;   
}

export async function listaProdutos() {
    try {
        const listaProdutosAPI = await produtoAPI.getProducts();
        lista.innerHTML = '';
        console.log("Produtos sendo carregados :", listaProdutosAPI);

        listaProdutosAPI.results.forEach(elemento => lista.appendChild(
            constroiCard(
                elemento.nome,
                elemento.url_imagem,
                elemento.preco,
                elemento.url_produto,
                elemento.id
            )));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        lista.innerHTML = `<h1>Não foi possível carregar os produtos</h1>`;
    }
}

document.addEventListener("DOMContentLoaded", listaProdutos);



