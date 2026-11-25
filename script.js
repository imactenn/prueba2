
const listaCategorias = document.querySelector("#listaCategorias");

fetch("categorias.json")
    .then(resposta => resposta.json())
    .then(categorias => {
        categorias.forEach(categoria => {
            const artigo = document.createElement("article");
            const titulo = document.createElement("h3");
            const descricao = document.createElement("p");

            titulo.textContent = categoria.nome;
            descricao.textContent = categoria.descricao;

            artigo.appendChild(titulo);
            artigo.appendChild(descricao);
            listaCategorias.appendChild(artigo);
        });
    })
    .catch(() => {
        listaCategorias.textContent = "Nao foi possivel carregar as categorias.";
    });



const formularioPesquisa = document.querySelector("#formularioPesquisa");
const pesquisa = document.querySelector("#pesquisa");
const mensagemPesquisa = document.querySelector("#mensagemPesquisa");
const resultados = document.querySelector("#resultados");

formularioPesquisa.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nomePesquisado = pesquisa.value.trim();

    if (nomePesquisado === "") {
        mensagemPesquisa.textContent = "Digite o nome de um jogo.";
        return;
    }

    if (API_KEY === "2495ee56ad414963aaccd5ae77a9e46e") {
        mensagemPesquisa.textContent = "Coloque sua chave da RAWG no arquivo config.js.";
        return;
    }

    mensagemPesquisa.textContent = "Pesquisando...";
    resultados.innerHTML = "";

    fetch("https://api.rawg.io/api/games?key=" + API_KEY + "&search=" + encodeURIComponent(nomePesquisado) + "&genres=racing&page_size=6")
        .then(resposta => resposta.json())
        .then(dados => {
            resultados.innerHTML = "";

            if (dados.results.length === 0) {
                mensagemPesquisa.textContent = "Nenhum jogo encontrado. Tente outro nome.";
            } else {
                mensagemPesquisa.textContent = "Resultados encontrados:";

                dados.results.forEach(jogo => {
                    const artigo = document.createElement("article");
                    const titulo = document.createElement("h3");
                    const imagem = document.createElement("img");
                    const lancamento = document.createElement("p");
                    const nota = document.createElement("p");

                    titulo.textContent = jogo.name;
                    lancamento.textContent = "Lancamento: " + (jogo.released || "Nao informado");
                    nota.textContent = "Nota: " + (jogo.rating || "Sem avaliacao");

                    if (jogo.background_image) {
                        imagem.src = jogo.background_image;
                        imagem.alt = "Imagem do jogo " + jogo.name;
                        artigo.appendChild(imagem);
                    }

                    artigo.appendChild(titulo);
                    artigo.appendChild(lancamento);
                    artigo.appendChild(nota);
                    resultados.appendChild(artigo);
                });
            }
        })
        .catch(() => {
            mensagemPesquisa.textContent = "Ocorreu um erro ao pesquisar. Verifique sua chave e tente novamente.";
        });
});


const formularioJogo = document.querySelector("#formularioJogo");
const mensagemCadastro = document.querySelector("#mensagemCadastro");
const listaJogos = document.querySelector("#listaJogos");

formularioJogo.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nomeJogo = document.querySelector("#nomeJogo").value.trim();
    const categoriaJogo = document.querySelector("#categoriaJogo").value.trim();

    if (nomeJogo === "" || categoriaJogo === "") {
        mensagemCadastro.textContent = "Preencha todos os campos.";
        mensagemCadastro.className = "erro";
    } else {
        const item = document.createElement("li");
        item.textContent = nomeJogo + " - " + categoriaJogo;
        listaJogos.appendChild(item);

        mensagemCadastro.textContent = "Jogo cadastrado com sucesso!";
        mensagemCadastro.className = "sucesso";

        formularioJogo.reset();
    }
});
