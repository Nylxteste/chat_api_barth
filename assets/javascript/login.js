var novoCampo = document.createElement("select");
var entrarBtn = document.getElementById('entrar');
var enviarMsg = document.getElementById('enviarMsg');
// OBJ
obj = {
    login:undefined,
    lista: undefined
    
}

var mensagemJson = {};

// funcao de login
function entrar() {
  var email = document.getElementById("origem");
  var senha = document.getElementById("destino");
  var campo1 = document.getElementById('campo1');
  var campo2 = document.getElementById('campo2');
  var campoMod = document.getElementById('areaMod');
  var response = undefined;
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://barth.com.br/ApiChatCliqx/chat/verificarLogin.php?email=${email.value}&senha=${senha.value}`
  );
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
        if (response.login === true) {
            
          setTimeout(function () {
              
            obj.login = response.nome;
            email.value=obj.login
            console.log(obj.login);
            campo1.innerText='Origem';
            email.disabled=true;
            campo2.innerText='Destino';
            campoMod.innerHTML=''
          
            campoMod.appendChild(novoCampo)
            setTimeout(function(){
                var xhr = new XMLHttpRequest();
                xhr.open("GET","https://barth.com.br/ApiChatCliqx/chat/receberUsuarios.php")
                xhr.send(null);
                xhr.onreadystatechange = function(){
                    if(xhr.readyState ===4){
                        if(xhr.status ===200){
            
                            obj.lista = JSON.parse(xhr.responseText)
                            for (i = 0; i < obj.lista.length; i++){
                                if(obj.lista[i].nome != obj.login){
            
                                    var option = document.createElement("option");
                                    var seletorOption = document.createTextNode(`${obj.lista[i].nome}`);
                                    
                                    option.appendChild(seletorOption)
                                    novoCampo.appendChild(option)
                                } 
                            }
                            entrarBtn.disabled=true;
                            enviarMsg.removeAttribute("disabled")
                        }
                    }
                }
            },1000)
        }, 1000);
        }
      }
    }
  };
}



/*  Para a tela de msg */

objMsg = {
  origem: document.getElementById("origem"),
  destino: document.getElementById("destino"),
  mensagem: document.getElementById("mensagem"),
  chate: document.getElementById("chate"),
  response: undefined,
  interval: undefined,
};

function pesquisar() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    `https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${objMsg.origem.value}&destino=${novoCampo.value}`
  );
  xhr.send(null);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        objMsg.chate.innerHTML = "";
        response = JSON.parse(xhr.responseText);
        for (let x = 0; x < response.length; x++) {
          var li = document.createElement("li");
          var dt = document.createElement("dt");
          var dtText = document.createTextNode(`${response[x].origem}`);
          dt.appendChild(dtText);
          li.appendChild(dt);

          var dd = document.createElement("dd");
          var ddText = document.createTextNode(`${response[x].mensagem}`);
          dd.appendChild(ddText);
          li.appendChild(dd);

          chate.appendChild(li);
        }
      }
    }
  };
}
// FUNCAO DE CHAT
function chat() {
  clearInterval(objMsg.interval);
  console.log("qualquer coisa");
  mensagemJson = {
    destino: novoCampo.value,
    origem: obj.login,
    mensagem: objMsg.mensagem.value,
  };
  console.log(mensagemJson);
  var xhr = new XMLHttpRequest();
  // https://barth.com.br/ApiChatCliqx/chat/verificarMensagem.php?origem=${imputOrigem.value}&destino=${imputDestino.value};
  xhr.open(
    "POST",
    "https://barth.com.br/ApiChatCliqx/chat/inserirMensagem.php"
  );
  xhr.send(JSON.stringify(mensagemJson));
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status == 201) {
        interval = setInterval(function () {
          pesquisar();
        }, 4000);
      }
    }
  };
}
