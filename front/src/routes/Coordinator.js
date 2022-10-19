// NAVEGAR ATÉ A HOME CASO NÃO ESTEJA NELA
export const logoNavigation = (navigate, pathname, search) => {
    if(pathname !== '/store' || search) {
        navigate('/loja')
    }
}

// NAVEGAR ATÉ A HOME
export const homeNavigation = (navigate) => {
    navigate('/loja')
}

// NAVEGAR ATÉ A PÁGINA DE SEARCH
export const searchNavigation = (navigate, search) => {
    navigate(`/loja?q=${search}`)
}
// NAVEGAR ATÉ A PÁGINA DO CARRINHO
export const shoppingCartNavigation = (navigate) => {
    navigate('/carrinho')
}

// NAVEGAR ATÉ A PÁGINA DE LOGIN
export const loginNavigation = (navigate) => {
    navigate('/')
}

// NAVEGAR ATÉ A PÁGINA DE CADASTRO DE ENDEREÇO
export const addressNavigation = (navigate) => {
    navigate('/cadastro-endereco')
}

// NAVEGAR ATÉ A PÁGINA DE PEDIDOS
export const ordersNavigation = (navigate) => {
    navigate('/pedidos')
}

// NAVEGAR ATÉ A PÁGINA DE DETALHES DO PEDIDO
export const orderDetailsNavigation = (navigate, id) => {
    navigate(`/pedidos/${id}`)
}

// NAVEGAR ATÉ A PÁGINA DE CADASTRO 
export const signUpNavigation = (navigate) => {
    navigate('/cadastro')
}
