// NAVEGAR ATÉ A HOME CASO NÃO ESTEJA NELA
export const logoNavigation = (navigate, pathname, search) => {
    if(pathname !== '/' || search) {
        navigate('/')
    }
}

// NAVEGAR ATÉ A HOME
export const homeNavigation = (navigate) => {
    navigate('/')
}

// NAVEGAR ATÉ A PÁGINA DE SEARCH
export const searchNavigation = (navigate, search) => {
    navigate(`/?q=${search}`)
}
// NAVEGAR ATÉ A PÁGINA DO CARRINHO
export const shoppingCartNavigation = (navigate) => {
    navigate('/carrinho')
}
