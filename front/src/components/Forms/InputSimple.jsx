import React from 'react';
import { Input, Application } from 'react-rainbow-components';
import ReactRainbowTheme from '../../assets/styles/ReactRainbowTheme';


const InputSimple = ({ 
    label, 
    placeholder, 
    value, 
    onChange, 
    error,
    type, 
    disabed = false,
    required = true,
    min = false,
    max = false,
}) => {

    const handleChange = (e) => {
        onChange(e.target.value);
    };

    const inputStyles = {
        width: '100%',
        minWidth: '250px',
        maxWidth: '560px',
    };

    return (
        <Application theme={ReactRainbowTheme} style={{width: "100%", display: "flex", justifyContent: "center"}}>
            {
                error ? (
                    <Input
                        label={label}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        error={error}
                        disabled={disabed}
                        theme={{ borderColor: "#FF5C5C" }}
                        type={type}
                        required={required}
                        style={inputStyles}
                        // min={min}
                        minLength={min}
                        maxLength={max}
                    />
                ) :
                    <Input
                        label={label}
                        placeholder={placeholder}
                        value={value}
                        disabled={disabed}
                        onChange={handleChange}
                        type={type}
                        required={required}
                        style={inputStyles}
                        minLength={min}
                        // min={min}
                        maxLength={max}
                    />
            }

        </Application>
    );
}

export default InputSimple;