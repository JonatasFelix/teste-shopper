import React from 'react';
import { Avatar, AvatarMenu, MenuDivider, MenuItem } from 'react-rainbow-components';
import * as s from './Avatar.styled';
import { ordersNavigation } from '../../../routes/Coordinator';
import { useNavigate } from 'react-router-dom';

import ImgProfile from '../../../assets/imgs/profile.png';

const AvatarHeader = ({ name, email, setToken, setTokenPayload }) => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setTokenPayload(null);
    }

    return (
        <div>
            <div className="rainbow-m-bottom_xx-large rainbow-p-bottom_xx-large">
                <AvatarMenu
                    className="rainbow-m-horizontal_small rainbow-m_auto"
                    id="avatar-menu"
                    src={ImgProfile}
                    assistiveText={name}
                    menuAlignment="right"
                    menuSize="small"
                    avatarSize="small"
                    title={name}
                    ButtonIconVariant="neutral"
                >
                    <s.StyledAvatarContainer className="rainbow-p-horizontal_small rainbow-align_center rainbow-flex">
                        <Avatar
                            initials={name.toUpperCase().charAt(0)}
                            assistiveText={name}
                            title={name}
                            size="medium"
                            style={{ backgroundColor: "#DA5726" }}

                        />

                        <div className="rainbow-m-left_x-small">
                            <s.StyledUserFullnameContainer className="rainbow-font-size-text_medium">
                                {name}
                            </s.StyledUserFullnameContainer>
                            <s.StyledUserEmailContainer className="rainbow-font-size-text_small">
                                {email}
                            </s.StyledUserEmailContainer>
                        </div>

                    </s.StyledAvatarContainer>
                    <MenuDivider variant="space" />
                    <MenuItem
                        label="Pedidos"
                        iconPosition="left"
                        onClick={() => ordersNavigation(navigate)}
                    />
                    <MenuItem
                        label="Sair"
                        iconPosition="left"
                        onClick={logout}
                    />
                </AvatarMenu>
            </div>
        </div>
    );
};

export default AvatarHeader;