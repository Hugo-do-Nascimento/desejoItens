import { produtoAPI } from "./produtoAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function adicionarProduto(evento) {
    evento.preventDefault();
    
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-preco]").value;
    const urlImagem = document.querySelector("[data-urlImagem]").value;
    const urlProduto = document.querySelector("[data-urlProduto]").value;

    try {
        await produtoAPI.postProduct(nome, urlImagem, preco, urlProduto);

        formulario.reset();
        
        const alert = document.getElementById('alert');
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
