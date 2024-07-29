import { produtoAPI } from "./produtoAPI.js";
import { listaProdutos } from "./exibirProdutos.js"

const formulario = document.querySelector("[data-formulario]");

async function adicionarProduto(evento) {
    evento.preventDefault();
    
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const url_imagem = document.querySelector("[data-urlImagem]").value;
    const url_produto = document.querySelector("[data-urlProduto]").value;

    try {
        await produtoAPI.postProduct(nome, url_imagem, preco, url_produto);

        await listaProdutos();

        formulario.reset();
        
        const alert = document.getElementById('alert');
        alert.textContent = 'Produto Adicionado com sucesso!';
        alert.classList.remove('alert-hidden');
        alert.classList.add('alert-visible');

        setTimeout(() => {
           alert.classList.remove('alert-visible');
           alert.classList.add('alert-hidden'); 
        }, 5000);
        // window.location.href = "../pages/envio.html";
    } catch (error) {
        alert(error)
    }
}

formulario.addEventListener('submit', evento => adicionarProduto(evento));
