[English](README.md) · [简体中文](README.zh-CN.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [日本語](README.ja.md)

# Pumpkin Jam — Criador de música e jogo de memória de Halloween

🎃 O baterista abóbora está procurando uma banda de fantasmas. Misture batidas aconchegantes, baixo borbulhante, sinos de doces e vozes ao luar neste criador de música original. Escolha os personagens, comece o loop e descubra como quatro pequenas partes mudam o clima da noite.

**[Jogar agora](https://halloween-sprunki.crazy3d.org/)** · [Ver os 12 jogos de Halloween](https://github.com/AshinTop/halloween-games) · [⭐ Dar uma estrela no GitHub](https://github.com/AshinTop/halloween-sprunki)

O README está disponível em cinco idiomas. A **interface do jogo oferece apenas inglês e chinês simplificado**.

![Criador de música Pumpkin Jam com quatro monstros, opções de som e controles de reprodução](docs/images/gameplay.jpg)

## O que torna este jogo especial

- Quatro funções: ritmo, baixo, melodia e voz, com dois personagens originais em cada uma.
- Três combinações prontas, três conjuntos secretos e trocas sincronizadas com o próximo compasso.
- Mute, Solo, remoção de partes e volume geral para explorar a mistura.
- Ghost Echo: cinco rodadas de memória musical com quatro notas, sem pressão de tempo.
- Personagens SVG e instrumentos Web Audio originais, links de arranjos e movimento reduzido.

## Como jogar

Escolha um personagem para cada função ou comece com uma combinação pronta. Aperte **Start**: o navegador precisa dessa interação para iniciar o áudio. Toque em outra carta para substituir o integrante. No desktop, também é possível arrastá-lo ao palco correspondente; um baixista não pode ocupar a vaga da melodia.

Todas as partes usam **96 BPM, dó menor e um compasso com 16 passos**. Enquanto a banda toca, as mudanças entram no início do próximo compasso. Mute silencia uma parte, Solo deixa você ouvi-la sozinha e remover libera a posição.

### Experimente Ghost Echo

Aperte **Listen**, memorize as notas tocadas pelos personagens e repita a ordem nos quatro botões. As cinco rodadas vão de três a sete notas. Se errar, ouça novamente e tente outra vez. Abrir Echo pausa a banda; ocultar a página interrompe a música e cancela a sequência pendente. Ao voltar, aperte Start ou Listen para continuar.

## Controles

| Ação | Como fazer |
| --- | --- |
| Escolher personagem | Clique ou toque; no desktop, arraste à função correspondente |
| Tocar ou pausar | Botão de reprodução; **Espaço** fora de controles e janelas |
| Ajustar partes | Botões **Mute**, **Solo** e remover |
| Volume geral | Controle deslizante de volume |
| Repetir notas no Echo | Quatro botões ou **1–4** durante sua vez |
| Compartilhar | Abra Share e copie o link exibido |

## Um pouco de estratégia

Comece com ritmo e baixo; depois acrescente melodia e voz separadamente. Use Solo para conhecer uma parte e então volte ao conjunto. Os grupos secretos são descobertos quando a combinação completa está tocando: tire todas as faixas do mudo, desligue Solo, mantenha o volume audível e espere o próximo compasso.

## Progresso e links de desafios

Arranjo, faixas silenciadas, volume, idioma, descobertas e conquistas do Echo ficam no navegador atual. Outro navegador terá registros separados. O jogo continua funcionando quando o armazenamento está indisponível.

Este [exemplo de link](https://halloween-sprunki.crazy3d.org/#mix=v1-1010-0000) restaura os quatro personagens e as opções de mute, mas não o Solo. Quem recebe precisa apertar Start. Compartilhar não envia uma gravação nem inicia o som automaticamente.

## Capturas de tela e vídeo de apresentação

![Pumpkin Jam em um iframe compacto com seleção de instrumentos e botão para iniciar](docs/images/mobile.jpg)

Captura real em um iframe compacto. Ela mostra o layout em uma janela pequena, não um teste em celular físico.

[Player de vídeo e transcrição](https://halloween-sprunki.crazy3d.org/intro.html) · [Baixar o MP4](docs/media/intro.mp4)

A **apresentação de 24 segundos, sem áudio**, combina capturas reais e legendas. É um passeio visual, não uma partida gravada continuamente nem uma demonstração sonora.

## Perguntas frequentes

### É um mod de um jogo Sprunki de terceiros?

Não. Pumpkin Jam tem personagens, arte, instrumentos sintetizados, padrões musicais e código próprios. Ele faz parte da mesma coleção de Halloween do site.

### Por que não sai som?

Aperte Start e confira volume geral, faixas no mudo, volume do aparelho e permissões de áudio do navegador. Ao voltar de uma página oculta, aperte Start ou Listen novamente.

### Posso gravar ou exportar uma música?

Esta versão compartilha links de arranjos. Ela não grava microfones, exporta arquivos WAV nem envia apresentações para um servidor.

## Executar localmente e incorporar

Inicie um servidor HTTP na raiz do repositório:

```sh
python3 -m http.server 4173
```

Abra **http://localhost:4173/**. Não é preciso compilar nem instalar dependências. Use HTTP: `file://` pode bloquear módulos JavaScript.

Execute as verificações incluídas com Node:

```sh
npm test
```

Os testes cobrem links, conjuntos, eventos musicais, Echo e o agendador de áudio real com relógios simulados, inclusive pausas longas e cancelamentos. Eles não medem latência de aparelhos físicos nem substituem a avaliação pelo ouvido.

```html
<iframe src="https://halloween-sprunki.crazy3d.org/?embed=1"
  title="Pumpkin Jam"
  style="display:block;width:100%;height:654px;border:0"
  allow="autoplay; fullscreen" allowfullscreen></iframe>
```

Os tamanhos revisados no navegador foram **1160×654**, **390×794**, **390×650** e **844×340**. Combinações prontas e instruções extras ficam em janelas compactas. São necessários Web Audio e módulos JavaScript. A permissão autoplay do iframe não substitui o botão Start nem retoma sozinha a música após a página ficar oculta.

Veja [EMBEDDING.md](EMBEDDING.md) para tamanho, armazenamento, foco e permissões. Meça a altura disponível após a barra do site principal.

## Mais pequenas aventuras de Halloween

- **[Midnight Rhythm Parade](https://halloween-rhythm-parade.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-rhythm-parade) — Toque três músicas originais em quatro pistas.
- **[Ghost Lanterns 3D](https://halloween-3d.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-3d) — Ilumine um jardim de abóboras com regras de Lights Out e pares de almas.
- **[Haunted Hearts](https://halloween-love-game.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-love-game) — Ajude dois fantasmas a dividir portas, caminhos e uma lanterna.
- **[Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/)** · [Código](https://github.com/AshinTop/halloween-tripeaks) — Encadeie cartas de valores consecutivos em oito resgates.

## Créditos e apoio

Criado para **AshinTop** e **Midnight Candy Club**, com design, programação e revisão conduzidos por pessoas com auxílio de IA. Arte e sons sintetizados originais do projeto. Dispensa conta remota; a hospedagem pode adicionar scripts ou registros de acesso.

Gostou? **[Deixe uma estrela no GitHub](https://github.com/AshinTop/halloween-sprunki)**. Para relatar problemas, inclua navegador, tamanho do iframe, link e passos para reproduzi-los.
