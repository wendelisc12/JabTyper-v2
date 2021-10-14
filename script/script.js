var campo = document.querySelector('#area-digitacao')
var start = document.querySelector('#iniciar')
var letras = document.querySelector('#letras')
var palavras = document.querySelector('#palavras')
var tempoTela = document.querySelector('#tempo')
var progressBar = document.querySelector('#progress')
var modalShowPoints = document.querySelector("#modal-show-points")
var recomecar = document.querySelector("#recomecar")
var mudarDificuldade = document.querySelector("#mudar-dificuldade")
var palavraEscolhida = document.querySelector("#palavraEscolhida")

var tabela = document.querySelector('table')
var regress = document.querySelector('#regressiva')

var tempo = 15
var contagem = 3

var palavrasCorretas = []

var nome = document.querySelector('#nome')

localStorage.setItem('0', 'Ajude-me Obi-Wan Kenobi. É minha única esperança.')
localStorage.setItem('1', 'A Força é forte em minha família. Meu pai a tem, eu a tenho e minha irmã a tem.')
localStorage.setItem('2', 'Você veio naquela coisa? Você é mais corajoso do que eu pensava.')

localStorage.setItem('3', 'Você já me salvou, Luke. Você estava certo. Diga a sua irmã que você estava certo.')
localStorage.setItem('4', 'Você não pode ganhar, Darth. Me ataca e eu vou me tornar mais poderoso do que você poderia imaginar.')
localStorage.setItem('5', 'Com o tempo aprenderás a confiar em teus instintos, então serás invencível!')

localStorage.setItem('6', 'You were the Chosen One! It was said that you would destroy the Sith, not join them! Bring balance to the Force and not throw it into darkness')
localStorage.setItem('7', "I failed you, Anakin. I failed you. I should have known the Jedi were planning to take power!")
localStorage.setItem('8', 'Fear is the way to the dark side. Fear leads to anger, anger leads to hatred, hatred leads to suffering.')

start.addEventListener('click',() => {
    event.preventDefault()


    var dificuldadeEscolhida = document.querySelector('input[name="dificuldade"]:checked').value

    if(dificuldadeEscolhida == 'fase1'){
        faseUm()
    }else if(dificuldadeEscolhida == 'fase2'){
        faseDois()
    }else if(dificuldadeEscolhida == 'fase3'){
        faseTres()
    }
    
    document.querySelector("#modal-dificuldades").style.top = "-100%"
})

recomecar.addEventListener('click', () => {
    campo.value = ''
    letras.innerHTML = "0"
    palavras.innerHTML = "0"
    modalShowPoints.style.top = "-100%"
    event.preventDefault();

    var dificuldadeEscolhida = document.querySelector('input[name="dificuldade"]:checked').value

    if(dificuldadeEscolhida == 'fase1'){
        faseUm()
    }else if(dificuldadeEscolhida == 'fase2'){
        faseDois()
    }else if(dificuldadeEscolhida == 'fase3'){
        faseTres()
    }
})

mudarDificuldade.addEventListener('click', ()=>{
    campo.value = ''
    letras.innerHTML = "0"
    palavras.innerHTML = "0"
    modalShowPoints.style.top = "-100%"
    document.querySelector("#modal-dificuldades").style.top = "0%"
})

function fraseAleatoria(min, max){
    var nAleatorio = Math.floor(Math.random() * (max - min + 1) + min)
    var fraseAleatoria = localStorage.getItem(nAleatorio)
    
    fraseCortada = fraseAleatoria.split(' ')
    palavraEscolhida.innerHTML = fraseAleatoria

}

campo.addEventListener('input', () => {
    frase = campo.value

    var numLetras = frase.trim().replace(/\s+/g,'').replace( /\W\s/g , '').length
    letras.innerHTML = numLetras

    var numPalavras = frase.trim().match(/(\w|\s)*\w(?=")|[\w\u00C0-\u00FF]+/ig)
    numPalavras == null ? palavras.innerHTML = '0' : palavras.innerHTML = numPalavras.length
})

function tempoCronometro(){
    contagemRegressiva = setInterval(()=>{
        contagem--
        regress.innerHTML = contagem
        progressBar.style.width = "100%"
        if(contagem == 0){
            clearInterval(contagemRegressiva)
            regress.style.display = "none"
            cronometro = setInterval(()=>{
                campo.removeAttribute('disabled', true)
                tempo--
                tempoRestante = tempo
                tempo < 10 ? tempoTela.innerHTML = "0" + tempo : tempoTela.innerHTML = tempo
                porcentagem = (tempoRestante/tempoInicial * 100) + "%"
                console.log(progressBar.style.width = porcentagem)
                
                if(tempo == 0){
                    clearInterval(cronometro)
                    campo.setAttribute('disabled', true)
                    tempo = tempoInicial
                    tempoTela.innerHTML = tempo
                    contagem = 3
                    regress.style.display = "initial"
                    regress.innerHTML = '3'

                    var nomeUser = nome.value
                    console.log(nomeUser)
                    modalShowPoints.style.top = 0
                    var noName = "Guest"

                    fraseCortadaUsuario = frase.split(' ')
                    for(c=0; c<fraseCortada.length; c++){
                        if(fraseCortada[c] == fraseCortadaUsuario[c]){
                            palavrasCorretas.push(fraseCortadaUsuario[c])
                        }
                    }

                    palavrasDigitadas = palavrasCorretas.length
                    pontuacao = palavrasDigitadas/tempoInicial*60

                    document.querySelector("#palavras-corretas-show").innerHTML = palavrasDigitadas

                    if(nomeUser.length == 0){
                        document.querySelector("#nome-player").innerHTML = noName
                        localStorage.setItem(noName, "pontuação: " + pontuacao + "PPM" + " / modo: " + idDificuldade)
                    }else{
                        document.querySelector("#nome-player").innerHTML = nomeUser
                        localStorage.setItem(nomeUser, "pontuação: " + pontuacao + "PPM" + " / modo: " + idDificuldade)
                    }

                    document.querySelector("#ppm").innerHTML = pontuacao
                    document.querySelector("#historico-jogador-tabela").innerHTML += '<tr><td>'+idDificuldade+ '</td><td>'+pontuacao+' <span>ppm</span></td></tr>'
                }
                
            }, 1000)
        }
    }, 1000)

}


function faseUm(){
    idDificuldade = "modo fácil"
    tempo = 25
    tempoInicial = tempo
    tempoTela.innerHTML = tempo
    fraseAleatoria(0,2)
    tempoCronometro()
}

function faseDois(){
    idDificuldade = "modo médio"
    tempo = 20
    tempoInicial = tempo
    tempoTela.innerHTML = tempo
    fraseAleatoria(3,5)
    tempoCronometro()
}

function faseTres(){
    idDificuldade = "modo difícil"
    tempo = 15
    tempoInicial = tempo
    tempoTela.innerHTML = tempo
    fraseAleatoria(6,8)
    tempoCronometro()
}

