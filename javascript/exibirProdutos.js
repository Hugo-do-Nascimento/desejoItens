import { produtoAPI } from "./produtoAPI.js";

const lista = document.querySelector("[data-lista]");

export function constroiCard(nome, urlImagem, preco, urlProduto, id) {
    const card = document.createElement("div");
    
    card.className = "card";
    card.innerHTML = 
        `
            <img class="imagemCard" src="${urlImagem}" alt="Produto">
            <p class="nomeProduto" data-urlProduto="${urlProduto}">${nome}</p>
            <div class="footerCard">
                <p class="preco">R$<span class="valor">${preco}</span></p>
                <img class="iconeLixeira" src="/imagens/trash-2.svg" alt="Icone - Lixeira" data-id="${id}">
            </div>
        `

    card.querySelector(".nomeProduto").addEventListener("click", () => {
        console.log(urlProduto);
        window.location.href = urlProduto;
    });

    card.querySelector(".iconeLixeira").addEventListener("click", async (evento) => {
        const id = evento.target.dataset.id;
        await produtoAPI.deleteProduct(id);
        card.remove();
    })

    return card;   
}

async function listaProdutos() {
    try {
        const listaProdutosAPI = await produtoAPI.getProducts();
        console.log("Produtos sendo carregados :", listaProdutosAPI);

        listaProdutosAPI.forEach(elemento => lista.appendChild(
            constroiCard(
                elemento.nome,
                elemento.urlImagem,
                elemento.preco,
                elemento.urlProduto,
                elemento.id
            )));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        lista.innerHTML = `<h1>Não foi possível carregar os produtos</h1>`;
    }
}

listaProdutos();



