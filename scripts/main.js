const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const btnIniciar = document.querySelector('.app__card-primary-button')
const startPauseBt = document.querySelector('#start-pause');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const tituloForte = document.querySelector('.app__title-strong')
const btnActive = document.querySelector('.app__card-button.active')
const botoes = document.querySelectorAll('.app__card-button')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const som_play = new Audio('/sons/pause.mp3')
const som_pause = new Audio('/sons/play.wav')
const som_beep = new Audio('/sons/beep.mp3')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const setas_play_pause = document.querySelector('.app__card-primary-butto-icon')
const tempoNaTela = document.querySelector('#timer')


let tempoDecorridoEmSegungos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () =>{
    if (musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegungos = 1500;
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegungos = 300;
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
   
})

longoBt.addEventListener('click',  () =>{
    tempoDecorridoEmSegungos = 900;
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (context) {
        context.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    btnActive.setAttribute

    switch (contexto) {
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`

            break;

            case 'descanso-curto':
                titulo.innerHTML = `Que tal dar uma respirada?<br>
                </strong> Faça uma pausa curta!`   
            break;

            case 'descanso-longo':
                titulo.innerHTML = `Hora de voltar a superfície.<br>
                </strong> Faça uma pausa longa.` 
        default:
            break;
    }
}

const contagemRegressiva = () =>{
    if(tempoDecorridoEmSegungos <= 0){
        som_beep.play();
        alert('Tempo encerrado')
        zerar()
        iniciarOuPausarBt.textContent = 'Recomeçe'
        return
    }

    tempoDecorridoEmSegungos -= 1
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if(intervaloId){
        som_play.play();
        zerar()
        
        return
    }
    som_pause.play();
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = 'Pausar'
    setas_play_pause.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Começar'
    setas_play_pause.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegungos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();