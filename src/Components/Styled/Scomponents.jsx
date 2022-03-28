import styled from 'styled-components'

const Main = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    margin: auto;
    border: 1px solid black;
    & div:first-child {
        width: 40%;
        &>img {
            width: 100%;
            height: 100%;
        }
    }
    & div:last-child { 
        width: 50%;
        border: 1px solid black;
    }
`
export {Main}