# portfolio-premium

Projeto de portfólio premium em HTML estático com estrutura preparada para manutenção e evolução.

## Estrutura do projeto

- `index.html` - ponto de entrada principal com a estrutura semântica do site.
- `css/custom.css` - estilos avançados e utilitários que não dependem de Tailwind.
- `js/main.js` - inicialização global da página.
- `js/animations.js` - lógica do IntersectionObserver para efeitos de reveal.
- `js/video-sync.js` - sincronização do vídeo com o scroll usando requestAnimationFrame.
- `js/ui-components.js` - controle de comportamento da navbar e componentes de UI.
- `assets/videos/` - vídeos do projeto.
- `assets/images/` - imagens de projeto, galeria e placeholders.
- `assets/vectors/` - SVGs e elementos vetoriais.
- `assets/fonts/` - fontes locais.
- `components/` - diretório opcional para fragmentos reutilizáveis.

## Como usar

Para manter os scripts ES Modules funcionando corretamente, é recomendável servir o projeto com um servidor local:

```bash
cd /home/guibes/Área de trabalho/PORTFOLIO - ENG
python3 -m http.server 8000
```

Depois, abra `http://localhost:8000` no navegador.

## Observações

- O conteúdo visual e a estrutura do `index.html` foram mantidos.
- Os estilos inline foram movidos para `css/custom.css`.
- O script inline foi dividido em `js/main.js`, `js/animations.js`, `js/video-sync.js` e `js/ui-components.js`.

## Assets não criados

Os arquivos abaixo não foram criados porque não havia conteúdo disponível ainda:

- `assets/videos/hero-scroll.mp4`
- `assets/videos/hero-mobile.mp4`
- imagens de `assets/images/projetos/`
- imagens de `assets/images/galeria/`
- placeholders de `assets/images/placeholders/`
- ícones/logos/decorations em `assets/vectors/`
- fontes em `assets/fonts/`

Coloque os arquivos reais nessas pastas quando estiver pronto.
