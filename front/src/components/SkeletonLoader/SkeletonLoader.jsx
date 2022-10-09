import * as s from "./styles"

// SLELETON LOADER - COMPONENTE QUE MOSTRA UM LOADER ENQUANTO OS DADOS ESTÃO CARREGANDO

const SkeletonLoader = () => {

    return (
        <s.Container>
            <s.Loader />
        </s.Container>
    )
}


export default SkeletonLoader