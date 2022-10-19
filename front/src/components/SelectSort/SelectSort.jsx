import * as s from "./styles";

const SelectSort = ({setSort, setOrder }) => {
    
    const handleSort = (event) => {
        const { order, sort } = JSON.parse(event.target.value); 
        setOrder(order);    
        setSort(sort);      
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