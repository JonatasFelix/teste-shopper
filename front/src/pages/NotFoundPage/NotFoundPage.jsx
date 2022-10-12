import Header from "../../components/Header/Header";
import ImgNotFound from "../../assets/imgs/not-found.png";
import * as s from "./styles";

const NotFoundPage = () => {
    return (
        <div>
            <Header />
            <s.ContainerImg>
                <s.Img src={ImgNotFound} alt="Not Found" />
            </s.ContainerImg>
            
        </div>
    )
};

export default NotFoundPage;