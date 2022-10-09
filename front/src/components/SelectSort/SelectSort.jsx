import * as s from "./styles";

// COMPONENTE PARA ORDENAR OS PRODUTOS
// RECEBE
// setSort: FUNÇÃO PARA SETAR O ESTADO SORT - ASC OU DESC
// setOrder: FUNÇÃO PARA SETAR O ESTADO ORDER - NAME OU PRICE

const SelectSort = ({setSort, setOrder }) => {

    // FUNÇÃO PARA SETAR O ESTADO SORT
    const handleSort = (event) => {
        const { order, sort } = JSON.parse(event.target.value); // PEGA O VALOR DO SELECT E TRANSFORMA EM OBJETO
        setOrder(order);    // SETA O ESTADO ORDER
        setSort(sort);      // SETA O ESTADO SORT
    };
    
    return (
        <s.Container>
            <s.Label>Ordenar por:</s.Label>
            <s.Select onChange={handleSort}>
                <option value='{"order": "asc", "sort": "name"}'>A-Z</option>
                <option value='{"order": "desc", "sort": "name"}'>Z-A</option>
                <option value='{"order": "asc", "sort": "price"}'>Menor preço</option>
                <option value='{"order": "desc", "sort": "price"}'>Maior preço</option>
            </s.Select>
        </s.Container>
    );
};

export default SelectSort;