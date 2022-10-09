export const logoNavigation = (navigate, pathname, search) => {
    if(pathname !== '/' || search) {
        navigate('/')
    }
}

export const homeNavigation = (navigate) => {
    navigate('/')
}

export const searchNavigation = (navigate, search) => {
    navigate(`/?q=${search}`)
}

export const shoppingCartNavigation = (navigate) => {
    navigate('/carrinho')
}
