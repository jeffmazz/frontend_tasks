# FrontEnd do Projeto Tasks List

## Descrição
Construído em React com o propósito de realizar uma lista de tarefas com um sistema de autenticação, armazenamento e manipulação de dados utilizando o MySQL como database e este [backend](https://github.com/jeffmazz/backend_tasks) para se relacionar e realizar o processamento dos dados.

---

## Como usar

Inicialmente precisamos ter um usuário cadastrado no banco de dados e após isso realizar o login.

Caso não possua um cadastro você pode estar realizando um clicando em registro no canto superior direito da página, no menú de navegação.

Realizando o login você poderá armazenar suas tarefas de forma rápida, marcá-las como concluídas ou pendentes ou até excluí-las da sua lista.

Trocar a senha também é uma opção, você pode fazer isso ao passar o mouse sobre a engrenagem localizada no canto superior direito da interface que mudará após a realização do login.

lembrando que para que tudo funcione corretamente precisamos também configurar o [backend](https://github.com/jeffmazz/backend_tasks) da aplicação.

---

## Tecnologias Utilizadas
- HTML
- CSS
- React - JSX

---

## Dependências
- **react-icons**: para ícones
- **react-router-dom**: para roteamento
- **react-tooltip**: para tooltips

---

## Funcionalidades

<details>
    <summary> Funcionalidades da Barra de Navegação </summary>
    <ul>
        <li> Caso não esteja logado:
            <ul>
                <li> (ícone de casa) Redirecionamento para a página de login pois não estamos logados </li>
                <li> **Login:** Acesso à página de login </li>
                <li> **Register:** Acesso à página de cadastro </li>
            </ul>
        </li>
        <li> Caso esteja logado:
            <ul>
                <li> (Aqui será adicionado um ícone de casa) Acessar a página inicial (home) </li>
                <li> **Perfil:** Acesso às suas informações </li>
                <li> (Aqui será adicionado um ícone de engrenagem) Opções de alteração de senha e deletar conta
                   <ul>
                       <li> Alteração se senha
                           <ul>
                               <li> Após clicar na opção será enviado uma mensagem para o e-mail cadastrado contendo um link com token </li>
                               <li> Ao clicar no link você será direcionado para a página de alteração de senha </li>
                               <li> Caso você não esteja logado ao clicar no link você será redirecionado à página de login e ao realizar o login você voltará a pagina de alteração de senha para informar a senha antiga e a nova senha para fazer a atualização </li>
                               <li> Caso esteja logado você precisará apenas informar a antiga e nova senha para realizar a alteração </li>
                               <li> Caso ocorra algum erro durante o processo uma mensagem de erro será exibida na tela informando que a senha antiga não está correta ou que as novas senhas não batem pois precisamos informá-las duas vezes </li>
                           </ul>
                       </li>
                   </ul>
                 </li>
            </ul>
        </li>
    </ul>
</details>

<details>
    <summary> Página de Login e Registro </summary>
    <ul>
        <li> Caso esteja logado:
            <ul>
                <li> Redirecionamento para a página inicial </li>
            </ul>
        </li>
         <li> Caso não esteja logado:
            <ul>
                <li> **Login**
                    <ul>
                        <li> Informar e-mail e senha para realização de Login </li>
                        <li> Caso as informações estejam incorretas uma mensagem de erro aparecerá na tela informando o erro ocorrido. Exemplo: Senha incorreta. </li>
                        <li> Caso estejam corretas um token será gerado no backend utilizando JWT e posteriormente devolvido ao front onde será armazenado no localStorage para autenticação </li>
                    </ul>
                </li>
                <li> **Registro**
                    <ul>
                        <li> Preencher o formulário com nome, e-mail, senha e confirmação de senha para realização de cadastro </li>
                        <li> Caso algum campo único já exista no banco de dados, uma mensagem de erro aparecerá na tela informando o erro ocorrido. Exemplo: E-mail já existente. </li>
                        <li> Caso esteja tudo certo um cadastro será realizado no banco de dados e um e-mail será enviado para o e-mail informado para a ativação da conta </li>
                    </ul>
                 </li>
            </ul>
        </li>
    </ul>
</details>

<details>
    <summary> Funcionalidades da Home </summary>
    <ul>
        <li> Redirecionamento para a página de Login caso o usuário não esteja logado </li>
        <li> Caso esteja logado:
            <ul>
                <li> **Adicionar tarefas:** Clicando no botão adicionar ou apertando enter após preencher o campo de descrição de tarefa no centro da página </li>
                <li> **Visualização das tarefas:** Caso existam tarefas associadas à sua conta uma lista contendo todas as tarefas será exibida logo abaixo do campo de adição de tarefas </li>
                <li> **Remover tarefas:** Clicando no ícone de lixeira presente no canto direto de cada tarefa </li>
                <li> **Alternar entre tarefa concluída e pendente:** Clicando no ícone ao lado da lixeira que alterna entre um ícone de feito e desfeito </li>
            </ul>
        </li>
    </ul>
</details>

---

## Instalação
1. Clone o repositório ``` bash git clone https://github.com/jeffmazz/frontend_tasks.git ```
2. Navegue até a pasta do projeto ``` cd frontend ```
3. Instale as dependências - ``` npm install ```
4. Execute o servidor - ``` npm run dev ```

---

## Licença
**MIT**

---

## Considerações Finais
Caso queira você pode visualizar o projeto por completo clicando [aqui](https://github.com/jeffmazz/backend_tasks) para acessar o backend do projeto.
