/*
    |Novembro/2019|
    Codigo desenvolvido por Gabriel Duarte
    Contato: https://www.facebook.com/Gabriields18
    WhatsApp: +55 34 99170-5400
    -----------------------------------------------
    É utilizados metodos do jQuery, Smtpjs, balloon.css, Bootstrap e tipo de linguagem Javascript ES8.
    -----------------------------------------------
    Assim que é importada o jQuery:
    - Ele valida se o documento foi totalmete carregado
    - Gera os metodos de chamada dos botões
    - Gera os metodos de validação de campos
*/

// Variavel de Captcha
var codeCaptcha = "";
$(document).ready(() => {
        $("#slideshow > div:gt(0)").hide();

        setInterval(function() {
            $('#slideshow > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#slideshow');
        }, 3000);
        //Click de botão para enviar o formulário
        $("#sendEmailButton").click(() => {
            //Faz as validações para verificar se o email é verdadeiro
            if (validarEmail()) {
                let nome = $("#contact_name").val()
                let email = $("#contact_email").val()
                let msg = $("#contact_message").val()
                montarEmail(nome, email, msg).then(template => {
                    let nome = $("#contact_name").val()
                    enviarEmail(template, nome)
                });
            }
        })
        gerarCaptcha();
        //Botao WhatsApp Metodo criado para abrir WhatsApp Web em nova tela.
        $("#botaoWpp").click(() => {
            openInNewTab('https://web.whatsapp.com/send?phone=553492305475&text&source&data')
        });
        $("#botaoFace").click(() => {
            openInNewTab('https://www.facebook.com/profile.php?id=100001625138061')
        });
        $("#botaoInsta").click(() => {
            openInNewTab('https://www.instagram.com/nando_m_s/?igshid=1gl3h7bu8199f')
        });
        $("#botaoWhats").click(() => {
            openInNewTab('https://api.whatsapp.com/send?phone=553492305475&text=Ol%C3%A1%20vim%20pelo%20site')
        });
        $("#botaoTwitter").click(() => {
            alert('Sem Twitter')
        });
        //Os KeyPress são utilizados para resetar os campos do formulário de contato
        $("#contact_name").keypress((e) => {
            if (!String.fromCharCode(e.which).match(/[A-Za-z0-9 ]/))
                return false;
            document.getElementById("contact_name").style.borderColor = "";
        });
        $("#contact_email").keypress((e) => {
            document.getElementById("contact_email").style.borderColor = "";
        });
        $("#contact_message").keypress((e) => {
            document.getElementById("contact_message").style.borderColor = "";
        });
        // Regra Captcha para bloquear carácteres invalidos
        $('#captchaText').keypress((e) => {

            if (!String.fromCharCode(e.which).match(/[A-Za-z0-9 ]/))
                return false;
            document.getElementById("contact_message").style.borderColor = "";
        });
    })
    //Este método serve para montar o formulário de email para ser enviado via SMTP
    //Exemplo Template:
    /* Assunto: Email de contato site: Gabriel
    Novo email de Gabriel
    Email de contato: gabriel160499@gmail.com
    Mensagem: Isso é um teste


    18/11/2019 - 10:12 am | Uberlandia-MG (Brazil)
    */
var montarEmail = (nome, email, mensagem) => {
        return $.getJSON("http://www.geoplugin.net/json.gp").then((result) => {
            return 'Novo email de ' + nome +
                '\nEmail de contato: ' + email + '\nMensagem: ' +
                mensagem + '\n\n\n' +
                formatarData(new Date()) +
                ' | ' + result.geoplugin_city + '-' + result.geoplugin_regionCode + ' (' + result.geoplugin_countryName + ')'
        });
    }
    //Constante para fazer a validação do formulário de contato e mostrar na tela os campos invalidos
const validarEmail = () => {
    let nome = $("#contact_name").val()
    let email = $("#contact_email").val()
    let msg = $("#contact_message").val()
    $("#sendEmailButton").text('Validando..')
    document.getElementById("sendEmailButton").disabled = true;
    //Campo nome Vazio
    if (nome == "") {
        //Estas propriedades e atributos são inseridas para mostrar os balões em cima dos botões
        document.getElementById("contact_name").style.borderColor = "red";
        document.getElementById("sendEmailButton").classList.add("tooltip-default");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
        document.getElementById("sendEmailButton").setAttribute("aria-label", "Insira um Nome");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
        // Metodo para retirar o balão
        setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 2000);
        $("#sendEmailButton").text('Enviar')
        document.getElementById("sendEmailButton").disabled = false;
        return false
    }
    //Campo email Vazio
    if (email == "") {
        document.getElementById("contact_email").style.borderColor = "red";
        document.getElementById("sendEmailButton").classList.add("tooltip-default");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
        document.getElementById("sendEmailButton").setAttribute("aria-label", "Insira o Email");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
        setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 2000);
        $("#sendEmailButton").text('Enviar')
        document.getElementById("sendEmailButton").disabled = false;
        return false
    }
    //Campo mensagem Vazio
    if (msg == "") {
        document.getElementById("contact_message").style.borderColor = "red";
        document.getElementById("sendEmailButton").classList.add("tooltip-default");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
        document.getElementById("sendEmailButton").setAttribute("aria-label", "Insira a mensagem");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
        setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 2000);
        $("#sendEmailButton").text('Enviar')
        document.getElementById("sendEmailButton").disabled = false;
        return false
    }
    //Validação na Sintaxe de email
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        document.getElementById("contact_email").style.borderColor = "yellow";
        document.getElementById("sendEmailButton").classList.add("tooltip-default");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
        document.getElementById("sendEmailButton").setAttribute("aria-label", "Verifique o email");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
        setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 2000);
        $("#sendEmailButton").text('Enviar')
        document.getElementById("sendEmailButton").disabled = false;
        return false
    }
    //Validação Captcha
    if (document.getElementById("captchaText").value.toUpperCase() != codeCaptcha.toUpperCase()) {
        gerarCaptcha();
        $("#captchaText").val('');
        document.getElementById("captchaText").style.borderColor = "yellow";
        document.getElementById("sendEmailButton").classList.add("tooltip-default");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
        document.getElementById("sendEmailButton").setAttribute("aria-label", "Captcha Incorreto");
        document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
        setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 2000);
        $("#sendEmailButton").text('Enviar')
        document.getElementById("sendEmailButton").disabled = false;
        return false
    }
    return true
}

// Metodo para enviar email via SMTP
const enviarEmail = (body, nome) => {
        $("#sendEmailButton").text('Enviando..')
        Email.send({
            Host: "smtp.gmail.com", // Provedor host SMPT - Atual: Gmail
            Username: "naomerespondanfs@gmail.com", //Email de conexão no SMTP
            Password: "mfs@2019", // Senha do email, Recomendado usar https://obfuscator.io/
            To: 'nando.m.s1990@gmail.com', // Email que será enviado o formulário
            From: 'naomerespondanfs@gmail.com',
            Subject: "Email de contato site: " + nome,
            Body: body
        }).then(
            message => {
                //Valida se a resposta da biblioteca de SMTP foi OK. Caso não seja OK irá aparecer um balão informado erro
                if (message == 'OK') {
                    //Limpando o Formulário
                    $("#contact_name").val('')
                    $("#contact_email").val('')
                    $("#contact_message").val('')
                    $("#captchaText").val('');
                    gerarCaptcha();
                    /*Estas propriedades e atributos são inseridas para mostrar os balões em cima dos botões
                      Neste caso irá aparece o balão de sucesso */
                    document.getElementById("sendEmailButton").disabled = false;
                    document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
                    document.getElementById("sendEmailButton").setAttribute("aria-label", "Enviado com sucesso");
                    document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
                    document.getElementById("sendEmailButton").classList.add("tooltip-sucess");
                    $("#sendEmailButton").text('Enviar')
                    setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 5000);

                } else {
                    /*Estas propriedades e atributos são inseridas para mostrar os balões em cima dos botões
                      Neste caso irá aparece o balão de erro*/
                    document.getElementById("sendEmailButton").setAttribute("data-balloon-visible", "");
                    document.getElementById("sendEmailButton").setAttribute("aria-label", "Erro ao enviar, Tente mais Tarde!");
                    document.getElementById("sendEmailButton").setAttribute("data-balloon-pos", "up");
                    document.getElementById("sendEmailButton").classList.add("tooltip-error");
                    $("#sendEmailButton").text('Enviar')
                    setTimeout(() => document.getElementById("sendEmailButton").removeAttribute("data-balloon-pos"), 10000);
                }
            }

        );
    }
    // Metodo para formatar a data e hora
const formatarData = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " + strTime;
        //Retorno 01/01/2019 - 10:00 am
    }
    //Metodo para abir em nova guia
const openInNewTab = (url) => {
        let win = window.open(url, '_blank');
        win.focus();
    }
    // Metodo para gerar o Captcha (0-9 / a-z / A-Z)
const gerarCaptcha = () => {
    document.getElementById('captcha').innerHTML = "";
    let charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lengthOtp = 6;
    let captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        let index = Math.floor(Math.random() * charsArray.length + 1);
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    let canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 300;
    canv.height = 50;
    canv.setAttribute("style", "color:green;")
    let ctx = canv.getContext("2d");
    ctx.font = "40px Georgia";
    ctx.strokeText(captcha.join(""), 110, 30);
    codeCaptcha = captcha.join("");
    document.getElementById("captcha").appendChild(canv);
}
