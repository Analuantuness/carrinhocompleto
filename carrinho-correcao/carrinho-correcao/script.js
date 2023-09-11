//está criando um array com algumas informações
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/1.png",
    },

    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de JavaScript",
        imagem: "./assets/3.png",
    },
    ];

    //cria uma string HTML
    function renderizaProdutos(){
        let html = "";
        for (let i = 0; i < produtos.length; i++) {
            html = html + criaProduto(produtos[i], i);
        }
        return html;
    }
    
    //retorna informações
    function criaProduto(produto, index) {
        return `
        <div class="curso">
            <img class='inicio' title="t" src="${produto.imagem}" />
            <div class="curso-info">
                <h4>${produto.nome}</h4>
                <p>${produto.prof}</p>
                <p>${produto.descricao}</p>
            </div>
            <div class="curso-preco">
                <span class="preco-de"R$${produto.preco_de}</span>
                <span class="preco-por"R$${produto.preco_por}</span>
                <button class="btncar btn-add" data-index="${index}"></button>
            </div>
        </div>
        `;
    }
    //está armazenando uma informação, podendo acessar e manipular os dados
    const container = document.querySelector('#container')

    //O HTML gerado pela função será inserido dentro do elemento com o ID container
    container.innerHTML = renderizaProdutos();

    //Rastrear os itens que estão no carrinho de compras,
    //permitindo a manipulação do carrinho, como adição, remoção e cálculo de totais.
    const carrinhoItens = {};

    //esta função é usada para renderizar os itens no carrinho
    function renderizaCarrinho() {
        let html ='';
        for (let produtoId in carrinhoItens) {
            html = html + criaItemCarrinho(carrinhoItens[produtoId]);
        }
        document.querySelector('.carrinho_itens').innerHTML = html;
    }

    //Utiliza os valores das propriedades do objeto produto para preencher os campos do HTML gerado.
    function criaItemCarrinho(produto) {
        return `
        <div class="carrinho-compra">
        <h4>${produto.nome}</h4>
        <p>Preço unidade: ${produto.preco_por} | Quantidade:${produto.quantidade}</p>
        <p>Valor: R$: ${produto.preco_por*produto.quantidade}</p>
        <button data-produto-id="${produto.id}" class="btn-remove"></button>
        </div>
        `;
    }
    
    //Calcula o valor total dos itens no carrinho de compras e atualiza dinamicamente a exibição desse total
    function criaCarrinhoTotal() {
        let total = 0;
        for (let produtoId in carrinhoItens) {
            total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
        }
        Document.querySelector('.carrinho_total').innerHTML = `
        <h4>Total:<strong> R$${total}</strong></h4>
        <a href="#" target="_blank">
        <ion-icon name="card-outline"></ion-icon>
        <strong>Comprar Agora</strong>
        </a>
        `;}

        //Atualiza e remove dados do carrinho
    function adicionaItemNoCarrinho(produto) {
        if (!carrinhoItens[produto.id]) {
            carrinhoItens[produto.id] = produto;
            carrinhoItens[produto.id].quantidade = 0;
        }++carrinhoItens[produto.id].quantiade;
        renderizaCarrinho();
        criaCarrinhoTotal();}

        document.body.addEventListener('click', function (event) {
            const elemento = event.target;
            if (elemento.classList.contains('btn-add')) { 
                const index = parseInt(elemento.getAttribute('data-index'), 10);
                const produto = produtos[index];

                adicionaItemNoCarrinho(produto);
            }
            if (elemento.classList.contains('btn-remove')) {
                const produtoId = elemento.getAttribute('data-produto-id');
                if (carrinhoItens[produtoId].quantidade <= 1) {
                    delete carrinhoItens[produtoId];
                } else {
                    --carrinhoItens[produtoId].quantidade;
                }
                renderizaCarrinho();
                criaCarrinhoTotal();
            }
        });