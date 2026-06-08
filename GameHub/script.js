let utilizadores = JSON.parse(localStorage.getItem("utilizadores")) || [];
let utilizadorAtual = JSON.parse(localStorage.getItem("utilizadorAtual")) || null;

function registrar(){

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  if(!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  let jaExiste = utilizadores.find(u => u.email === email);
  if(jaExiste) {
    alert("Email já registado!");
    return;
  }

  let novo = {
    nome: nome,
    email: email,
    senha: senha,
    saldo: 100,
    historico: []
  };

  utilizadores.push(novo);
  localStorage.setItem("utilizadores", JSON.stringify(utilizadores));

  alert("Conta criada com sucesso! Saldo inicial: 100 moedas");
  window.location.href="login.html";
}

function entrar(){

  let email = document.getElementById("email").value;
  let senha = document.getElementById("senha").value;

  if(!email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  let user = utilizadores.find(u => u.email === email && u.senha === senha);

  if(user){
    localStorage.setItem("utilizadorAtual", JSON.stringify(user));
    window.location.href="wallet.html";
  } else {
    alert("Email ou senha incorretos!");
  }
}

function sair(){
  localStorage.setItem("utilizadorAtual", null);
  window.location.href="index.html";
}

function atualizarSaldo(valor, jogo){

  let user = JSON.parse(localStorage.getItem("utilizadorAtual"));

  if(!user) {
    alert("Faça login primeiro!");
    return;
  }

  user.saldo += valor;
  user.historico.push({
    jogo: jogo,
    valor: valor,
    data: new Date().toLocaleString()
  });

  // Atualizar no array de utilizadores
  let index = utilizadores.findIndex(u => u.email === user.email);
  if(index !== -1) {
    utilizadores[index] = user;
    localStorage.setItem("utilizadores", JSON.stringify(utilizadores));
  }

  localStorage.setItem("utilizadorAtual", JSON.stringify(user));
  alert("Ganhou " + valor + " moedas! Saldo atual: " + user.saldo);
}

function carregarWallet(){
  let user = JSON.parse(localStorage.getItem("utilizadorAtual"));

  if(!user) {
    window.location.href="login.html";
    return;
  }

  document.getElementById("nomeUser").textContent = user.nome;
  document.getElementById("saldo").textContent = user.saldo;

  let historicoHTML = "";
  if(user.historico.length === 0) {
    historicoHTML = "<p>Sem histórico</p>";
  } else {
    user.historico.forEach(h => {
      historicoHTML += "<div class='historico-item'>";
      historicoHTML += "<span>" + h.jogo + "</span>";
      historicoHTML += "<span class='valor'>+" + h.valor + "</span>";
      if(h.data) historicoHTML += "<span class='data'>" + h.data + "</span>";
      historicoHTML += "</div>";
    });
  }

  document.getElementById("historico").innerHTML = historicoHTML;
}

function atualizarSaldoWallet(){
  carregarWallet();
}
