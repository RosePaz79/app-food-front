yarn
yarn create vite
<nome do projeto>
React
TypeScript
npm install
yarn dev

Apagar=> assets, App.css, index.css

Instalar as dependencias 
eslint
editorConfig

apertar no botao esquerdo na pasta clicar em esGenerate .editor config 

forçar seguir alguns padrões de projeto eslint
npm init @eslint/config
y
· style
· esm  ----- JavaScript
 · react
yes
· browser 
· prompt ---- awser
 · Json
· tab
sing
windows
yes
yes
 · npm


app.tsx = apagar tudo digitar no lugar
export function App() {
    return (
        <div>
            <h1>Hello World</h1>
        </div>
    )
}

main.tsx = excluir a importação dos arquivos que foram excluidos
colocar App em chaves {App}

main carrega todos os componentes

Criar pasta assets em src
criar pasta fonts em assets
criar pasta images em assets
colocar fonts na pasta fonts
colocar imagens na pasta images
criar pasta components na pasta src
criar pasta styles na pasta src
colocar arquivo GlobalStyles.ts na pasta styles
rodar npm i styled-components
em App.tsx inserir
import { GlobalStyles } from "./styles/GlobalStyles";
import { Header } from "./components/Header";
export function App() {
    return (
        <>
            <GlobalStyles/>
            <Header/>
        </>
    );
}

instalar a extensão styled-components

criar um arquivo Header.tsx na pasta components e inserir
import {styled} from "styled-components";

const Container = styled.header `
    background: #d73035;
`;

export function Header() {
    return(
        <Container>
            <div className="page-details">
                <h1>Pedidos</h1>
                <h2>Acompanhamento de Pedidos</h2>
            </div>
        </Container>
    );
}



O arquivo App.tsx que chama as funções, então necessariamente necessita estar importando em App.tsx e com redirecionamento do arq


PROPS === alterar só oq quer
em Orders
index.tsx, chama a Função de Orderboard>index.tsx para não repetir o código, quantas vezes for chamado é as vezes que vai repetir o código 
então em Orders>index.tsx
import { Container } from "./styles"
import { OrdersBoard } from "../Orderboard"
//icon e title esta sendo exportado para Orderboard>index.tsx

export function Orders(){
    return (
        <Container>
            <OrdersBoard
            icon="⏰"
            title="Fila de espera"/>
            <OrdersBoard
            icon="👩‍🍳"
            title="Em preparação"/>
            <OrdersBoard
            icon="✔"
            title="Pronto"/>

        </Container>
    )
}
e em Orderboard>index.tsx
import { Board, OrdersContainer } from "./style"


interface OrderboardsBaordProps{
    icon:string;
    title:string;
}

export function OrdersBoard({icon, title}:OrderboardsBaordProps) { // vai retornar o index.tsx de Orders, icon e title que esta na interface OrderboardsBaordProps
    return (
        <Board>
        <header>
            {/* o icon de index.tsx */}
            <span>{icon}</span> 
            {/* o title de index.tsx */}
            <strong>{title}</strong>
            <span>(1)</span>
        </header>
        <OrdersContainer>
            <button type="button">
                <strong>Mesa 2</strong>
                <span>2 itens</span>
            </button>
            <button type="button">
                <strong>Mesa 2</strong>
                <span>2 itens</span>
            </button>
        </OrdersContainer>
    </Board>
    
    )
}
