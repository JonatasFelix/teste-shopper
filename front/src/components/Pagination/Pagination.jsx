import React, { useRef } from "react";
import ReactPaginate from "react-paginate";
import { BoxPagination } from "./styles";

// Pagination Recebe:
// total: Quantidade total de itens
// setPage: Função que será executada para atualizar a pagina
// quantityItems: Quantidade de itens que serão exibidos por pagina


const Pagination = ({ total, setPage, quantityItems }) => {
  const pagination = useRef();
  
  return total > 0 && (
    <BoxPagination>
      <div onClick={(e) => pagination.current.setState({ selected: 6 - 1 })} />
      <ReactPaginate
        ref={pagination}
        pageCount={Math.ceil(total / quantityItems)}   // FAZ O CALCULO DE QUANTAS PAGINAS SERÃO NECESSÁRIAS
        pageRangeDisplayed={4}                   // QUANTIDADE DE PAGINAS QUE SERÃO MOSTRADAS NO CONTADOR
        marginPagesDisplayed={1}                // A DISTANCIA ENTRE OS NUMEROS DO CONTADOR 
        onPageChange={setPage}                  // FUNÇÃO QUE SERÁ EXECUTADA PARA ATUALIZAR A PAGINA
        containerClassName="pagination"         // CLASSE DO CONTAINER  --  FOI CRIADO UM ESTILO PARA ESTA CLASSE
        activeClassName="active"                // CLASSE DO BOTÃO ATIVO -- FOI CRIADO UM ESTILO PARA ELE
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link"
        pageClassName="page-item"
        breakClassName="page-item"            
        nextClassName="page-item"
        previousClassName="page-item"
        previousLabel={<>&laquo;</>}          // LABEL DO BOTÃO ANTERIOR
        nextLabel={<>&raquo;</>}            // LABEL DO BOTÃO PROXIMO
      />
    </BoxPagination>
  );
};

export default Pagination;
