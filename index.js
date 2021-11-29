const produtos = [
    {
        id:0,
        nome: "Beijinho",
        valor: 2.00,
        imagem:"assets/beijinhos.jpg",
        quantidade:0,
    },
    {
        id:1,
        nome: "Bolo Prestígio",
        valor: 50.00,
        imagem:"assets/bolo-prestigio.jpg",
        quantidade:0,

    },
    {
        id:2,
        nome: "Cheese-cake",
        valor: 60.00,
        imagem:"assets/cheese-cake.jpg",
        quantidade:0,

    },
    {
        id:3,
        nome: "Brownie lasanha",
        valor: 15.00,
        imagem:"assets/lasanha-brownie.jpg",
        quantidade:0,

    },
    {
        id:4,
        nome: "Picolé Chocolate",
        valor: 3.00,
        imagem:"assets/picole-chocolate.jpg",
        quantidade:0,

    }
]
// Array de objetos
var valorCompra;
var valorTotal = [];

const iniciarLoja = () => {
    var vitrine = document.getElementById('vitrine');
    //método map realiza a função passada como argumento para cada item do array
    produtos.map((prod) => { // o argumento passado (prod) é o nome do elemento do array sendo processado 
        var valor = prod.valor.toFixed(2)
        //função para numbers que retorna uma string com decimal fixo com o número de casas passadas como argumento
        vitrine.innerHTML += 
        `<div class="produto">
            <div class="img-container" style="background-image:url(`+prod.imagem+`)">
                <div class="add">
                    <button class="link" key="`+prod.id+`" href="#">Adicionar ao carrinho</button>
                    <!-- crirei um atributo para identificar o elemento de uma class
                     atributo pode ser acessado por element.getAttribute() -->
                </div>
            </div>
            <p>`+prod.nome+`</p>
            <span>R$`+valor.replace('.', ',')+`</span>
            <!-- após ter passado o valor para decimal, troquei o ponto do padrão americano pela vírgula do padrão brasileiro. !!Buscar função que faça essa mudança de padrçao!! -->
        </div>`
    })
}

iniciarLoja();

const calcularCompra = () => {
    valorCompra = 0;
    for(var i=0; i < valorTotal.length; i++){
        if(produtos[i].quantidade>0)
        valorCompra += valorTotal[i];
    }
    console.log("valorCompra: "+valorCompra)
}

const atualizarCarrinho = () =>{
    var carrinho = document.getElementById('carrinho');
    carrinho.innerHTML = "";
    produtos.map((prod)=>{
        if(prod.quantidade>0){
            carrinho.innerHTML += 
            `
                <div class="produto-carrinho">
                    <div class="left">
                        <div class="carrinho-img" style="background-image:url(`+prod.imagem+`)"></div>
                        <div class="left-text">
                            <h2>`+prod.nome+`</h2>
                            <span>Quantidade: `+prod.quantidade+`</span>
                        </div>
                    </div>
                    <div class="right">
                        <span>Valor total: <br>
                              R$`+valorTotal[prod.id].toFixed(2).replace(".", ",")+`  
                        </span>
                    </div>
                </div>
                <hr>
            
            `
            // checa cada elemento do carrinho, se a quantidade for maior que 0, outputa ele no carrinho. Antes de atualizar, sempre limpa a tela para não duplicar um mesmo produto quando aumentada a quantidade
        }
        return false
    })
    carrinho.innerHTML +=
    `
        <div class="valor-compra">
            <h2>Valor da Compra:</h2>
            <span>R$`+valorCompra.toFixed(2).replace('.',",")+`</span>
        </div>
    `

}

// array com o produto do valor fixo pela quantidade de cada produto
const links = document.getElementsByClassName('link');
// array com todos os elementos da classe "link"
for(var i=0; i<links.length; i++){
    // looping que declara um eventListener para cada elemento do array 
    links[i].addEventListener("click", function(){
        // If I used an arrow fucntion the context would´ve inherited by the parent scope (global)
        
        var linkId = this.getAttribute("key");
        // contexto é o elemento que chama a função ao receber o evento
        produtos[linkId].quantidade++;
        // o produto com a posição relativa ao link clicado aumentará a quantidade
        valorTotal[linkId] = produtos[linkId].quantidade * produtos[linkId].valor;
        console.log("valor total: "+valorTotal);
        calcularCompra();
        atualizarCarrinho();
    })
}