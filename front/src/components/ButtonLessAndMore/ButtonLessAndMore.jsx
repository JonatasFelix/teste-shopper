import * as s from './styles';


const ButtonLessAndMore = ({maxQuantity, quantity, setQuantity, setOpenBox}) => {

    const ButtonMore = () => {
        return (
            quantity < maxQuantity 
            ? <s.ButtonMore onClick={() => setQuantity(quantity + 1)}>+</s.ButtonMore> 
            : <s.ButtonMore disabled>+</s.ButtonMore>
        )
    }

    const ButtonLess = () => {
        return ( 
            <s.ButtonLess onClick={() => setQuantity(quantity - 1)}>-</s.ButtonLess> 
        )
    }

    const ButtonQuantity = () => {
        return (
            <s.ButtonQuantity onClick={() => setOpenBox(true)}>{quantity}</s.ButtonQuantity>
        )
    }

    return (
        <s.Container>
            <ButtonLess />
                <ButtonQuantity />
            <ButtonMore />
        </s.Container>
    )


};

export default ButtonLessAndMore;