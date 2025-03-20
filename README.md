# Documentação do Ambiente e Execução do Projeto
Este projeto utiliza Laravel 10 no backend e React 19 no frontend e banco PostgreSQL, com orquestração de containers via Docker. Siga as instruções abaixo para configurar e executar o ambiente localmente:

1. No diretório raiz do projeto, execute o seguinte comando para iniciar os containers:

**docker-compose up --build**

2. Após o ambiente estar ativo, acesse o container Laravel (PHP):

**docker exec -it laravel_php bash**

3. Dentro do container, aplique as migrações para configurar o banco de dados PostgreSQL:

**php artisan migrate**



# Teste Técnico para a vaga de Engenheiro de Software no projeto UEFS - Avansys/ACP Group

Este desafio técnico é destinado aos candidatos à posição de Engenheiro de Software no projeto UEFS - Avansys/ACP Group. O objetivo é avaliar as competências em desenvolvimento de software através da criação de uma API Restful utilizando PHP, Laravel (versão 8 ou superior), um Sistema de Gerenciamento de Banco de Dados (SGBD) de sua escolha, e Docker. O prazo para a realização deste teste é de 5 dias, e a entrega deve ser feita por meio do GitHub para análise.

Para participar, faça um fork do repositório, aplique a solução proposta e envie para nossa avaliação.

## Critérios de Avaliação Técnica por Nível de Senioridade

### Para Todos os Níveis
- **Conhecimento e Uso de Recursos do Laravel**
- **Familiaridade com Docker e Docker Compose**
- **Organização e Documentação do Código**
- **Implementação Efetiva de uma API Restful**
- **Utilização Adequada dos Recursos do SGBD Escolhido**

### Júnior
- **Fundamentos de Lógica de Programação**: Capacidade de implementar lógicas simples e eficientes.
- **Conhecimento Básico dos Princípios SOLID**: Compreensão básica e aplicação em cenários simples.
- **Adesão aos Padrões PSR**: Implementação básica dos padrões de estilo de código PHP.
- **Uso Inicial de Testes Unitários (PHPUnit ou PEST) - Não é obrigatório**: Conhecimento básico e aplicação inicial em casos simples.

### Pleno
- **Lógica de Programação Avançada**: Habilidade em desenvolver soluções mais complexas e eficientes.
- **Aplicação Avançada dos Princípios SOLID**: Implementação consistente dos princípios em cenários mais complexos.
- **Testes Unitários Avançados (PHPUnit ou PEST)**: Habilidade em escrever testes unitários mais abrangentes e complexos.
- **Otimização e Performance do Código**: Capacidade de otimizar o código para melhor desempenho.

### Sênior
- **Lógica de Programação Avançada**: Habilidade em desenvolver soluções mais complexas e eficientes.
- **Aplicação Avançada dos Princípios SOLID**: Implementação consistente dos princípios em cenários mais complexos.
- **Arquitetura de Software e Design de Soluções**: Habilidade em projetar e implementar arquiteturas complexas e eficientes.
- **Liderança Técnica em Práticas de Desenvolvimento**: Orientação e mentoria para outros desenvolvedores, promoção de boas práticas.
- **Testes Unitários e de Integração Avançados**: Proficiência em criar uma suíte de testes abrangente, incluindo testes de integração.
- **Análise e Resolução de Problemas Complexos**: Capacidade de analisar e resolver problemas técnicos complexos e desafiadores.
- **Otimização e Performance do Código**: Capacidade de otimizar o código para melhor desempenho.
- **Documentação Técnica Abrangente**: Uma documentação completa e detalhada é essencial. Isso inclui não apenas a documentação da API com informações claras sobre endpoints, parâmetros, formatos de requisição e resposta, mas também uma visão geral do software, descrevendo sua arquitetura, componentes principais, e instruções passo a passo para instalação, configuração e utilização. A documentação deve ser estruturada de forma que seja acessível tanto para desenvolvedores quanto para usuários finais, garantindo uma compreensão abrangente do sistema como um todo.


## Tarefas

Desenvolva uma API em Laravel que inclua o CRUD para:
- Usuários
- Posts
- Tags

As regras de estruturação da modelagem são:
- O usuário (users) possui diferentes postagens (posts).
- As postagens (posts) possuem várias palavras-chave (tags).

Implemente os seguintes endpoints com operações CRUD para:
- Usuários
- Posts
- Tags

**NOTA:**
As rotas devem ser acessadas com o prefixo /api. Por exemplo: /api/posts  
É essencial o desenvolvimento de um Dockerfile e um docker-compose para garantir que o projeto seja executado na máquina do avaliador.  
É de suma importância a descrição detalhada dos endpoints e funcionalidades para que o avaliador possa testar o projeto em sua máquina.

## Opcionais (Não obrigatórios, mas recomendados)

- Implementação de testes unitários.
- Uso de Swagger ou Scribe Documentation.
- Criação de uma interface gráfica simples para exposição dos dados (React, Vue, Bootstrap, Blade ou Livewire).

Após a avaliação técnica, em caso de aprovação, entraremos em contato para uma conversa técnica sobre a implementação. Se o candidato não for aprovado, forneceremos um retorno com o aviso e o motivo.

### Boa sorte!
Equipe de Desenvolvimento AVANSYS/ACP - Projeto UEFS
