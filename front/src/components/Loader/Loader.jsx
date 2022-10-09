import * as s from "./styles";

// COMPONENTE DE LOADER
// RECEBE COMO PARÂMETRO O TAMANHO DO LOADER

const Loader = ({width, height}) => {
    return (
        <s.Loader width={width} height={height}/>
    );
}

export default Loader;