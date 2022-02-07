// fazer window onload e carregar os dados do storage depois de ter a lista salva
const botaoAdicionaTarefa = document.getElementById('criar-tarefa');
const botaoRemoveTodas = document.getElementById('apaga-tudo');
const botaoRemoveFinalizados = document.getElementById('remover-finalizados');
const botaoRemoveSelecionado = document.getElementById('remover-selecionado');
const botaoSalvaTarefas = document.getElementById('salvar-tarefas');
const botaoMoveParaCima = document.getElementById('mover-cima');
// eslint-disable-next-line sonarjs/no-duplicate-string
const lista = document.getElementById('lista-tarefas');
const texto = document.getElementById('texto-tarefa');

function salvarTarefas() {
  // Função feita com a ajuda da monitoria individual do Roberval
  const listaItens = document.getElementById('lista-tarefas');
  localStorage.clear();
  localStorage.setItem('listaTarefas', listaItens.innerHTML);
  // o que estava tentando fazer
  // if (listaItens.length === 0) {
  //   alert('Não há itens a serem salvos, você finalizou sua lista \\o/');
  //   localStorage.clear();
  // } else {
  // for (let index = 0; index < listaItens.length; index += 1) {
  //   console.log(listaItens[index]);
  //   localStorage.setItem(index, JSON.stringify(listaItens[index]));
  // }
  // }
}

function carregaTarefasSalvas() {
  const listaItens = document.getElementById('lista-tarefas');
  const itensSalvos = localStorage.getItem('listaTarefas');
  listaItens.innerHTML = itensSalvos;
  const itens = document.getElementsByTagName('li');
  for (let index = 0; index < itens.length; index += 1) {
    itens[index].addEventListener('dblclick', finalizaTarefa);
    itens[index].addEventListener('click', selecionaTarefa);
  }
}

window.onload = carregaTarefasSalvas;

function finalizaTarefa(event) {
  event.target.classList.toggle('completed');
}

function selecionaTarefa(event) {
  // captura o elemento clicado e busca se há algum elemento com selected
  const tarefaClicada = event.target;
  const tarefaSelecionada = document.querySelector('.selected');
  // verifica se há algum item já selecionado
  if (tarefaSelecionada) {
    tarefaSelecionada.classList.remove('selected');
  }
  tarefaClicada.classList.add('selected');
}

function adicionaTarefa() {
  if (texto.value === '') {
    alert('Digite uma tarefa');
  } else {
    const listaTarefas = document.createElement('li');
    listaTarefas.addEventListener('dblclick', finalizaTarefa);
    listaTarefas.addEventListener('click', selecionaTarefa);
    listaTarefas.className = 'itemList';
    listaTarefas.innerText = texto.value;
    lista.appendChild(listaTarefas);
    texto.value = '';
  }
}

function removeTodasTarefas() {
  const tamanhoLista = document.getElementsByClassName('itemList');
  if (tamanhoLista.length > 0) {
    // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    while (lista.firstChild) {
      lista.removeChild(lista.firstChild);
    }
  } else {
    alert('A lista está vazia');
  }
}

function removeFinalizados() {
  const tarefasFinalizadas = document.querySelectorAll('.completed');
  for (let index = 0; index < tarefasFinalizadas.length; index += 1) {
    lista.removeChild(tarefasFinalizadas[index]);
  }
}

function removeSelecionado() {
  // captura o elemento clicado e busca se há algum elemento com selected
  const tarefaSelecionada = document.querySelector('.selected');
  lista.removeChild(tarefaSelecionada);
}

function moveParaCima() {
  const elementoSelecionado = document.getElementsByClassName('selected');
  const cssElSelecionado = elementoSelecionado[0].className;
  const textElSelecionado = elementoSelecionado[0].innerText;
  console.log(textElSelecionado + ' ' + cssElSelecionado);
}

// REQUISITO 13 nextSibling e previousSibling ou nextElementSibling

botaoAdicionaTarefa.addEventListener('click', adicionaTarefa);
botaoRemoveTodas.addEventListener('click', removeTodasTarefas);
botaoRemoveFinalizados.addEventListener('click', removeFinalizados);
botaoRemoveSelecionado.addEventListener('click', removeSelecionado);
botaoSalvaTarefas.addEventListener('click', salvarTarefas);
botaoMoveParaCima.addEventListener('click', moveParaCima);
