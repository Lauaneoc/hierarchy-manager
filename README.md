# Tree View Application - Asset Management (Desafio Tractian)

## Descrição
Esta aplicação tem como objetivo visualizar a hierarquia de ativos de uma empresa através de uma estrutura de árvore. Os ativos podem incluir componentes, sub-ativos e locais, permitindo uma gestão eficiente e clara.
Implementei um login fake para simular a verificação do usuário antes de poder visualizar os dados.

#### Estrutura da árvore:
```
- Root
  |
  └── Location A
  |     |
  |     ├── Asset 1
  |     |     ├── Component A1
  |     |     ├── Component A2
  |     |
  |     ├── Asset 2
  |           ├── Component B1
  |           ├── Component B2
  |
  ├── Location B
  |     ├── Location C
  |     |     |
  |     |     ├── Asset 3
  |     |     |     ├── Component C1
  |     |     |     ├── Component C2
  |     |     |
  |     |     ├── Component D1
  |
  └── Component X
```

## Demonstração
Assista ao vídeo abaixo para ver a aplicação em funcionamento, incluindo a abertura de inscrições para cada empresa e a seleção de filtros:

[Demonstração da Aplicação](https://jam.dev/c/cdd88c00-5542-43aa-b0c0-65e022b70dcf)

## Funcionalidades
- Visualização dinâmica da árvore de ativos, componentes e locais.
- Filtros para busca de localização e ativos específicos.
- Identificação de sensores com `sensor de energia` ou `crítico`.
- Gráfico com dados fictícios para representar o monitoramento em tempo real do ativo.

## Tecnologias Utilizadas
- React
- TypeScript
- Visx (para gráficos)
- Tailwind (estilização)
- Heroicons (para ícones)

## Melhorias Propostas

1. **Performance:**
   - Implementar lazy loading para carregar os dados conforme necessário, melhorando a performance em árvores grandes.
   - Adicionar web socket para dados em tempo real.

2. **Experiência do Usuário:**
   - Adicionar feedback visual ao interagir com a árvore (ex: animações ao expandir/contrair).
   - Melhorar a navegação acessível para usuários com necessidades especiais.

3. **Funcionalidades Adicionais:**
   - Implementar uma funcionalidade de exportação de dados da árvore em formatos como CSV ou PDF.
   - Melhorar a funcionalidade de busca, permitindo buscas mais avançadas e filtros combinados.

4. **Visualização:**
   - Construir uma página somente para dashboard, para o cliente ter uma visão geral de quantos ativos, localizações e quantos possuem sensor crítico e/ou de energia.

## Como Executar
1. Clone este repositório.
2. Execute `npm install` para instalar as dependências.
3. Execute `npm run dev` para iniciar a aplicação.
4. LOGIN(user1) SENHA(user123)

## API Utilizada
- A aplicação se conecta à API em [fake-api.tractian.com](https://fake-api.tractian.com) para obter dados de empresas, locais e ativos.

#### Desenvolvido por Lauane
