import { DatePicker as DatePickerRainbow, Application } from "react-rainbow-components";

const DatePicker = ({ dateState, setDateState, error, cartEmpty }) => {

    let maxDate = new Date()
    maxDate = maxDate.setDate(maxDate.getDate() + 30)
    maxDate = new Date(maxDate)

    let minDate = new Date()
    minDate = minDate.setDate(minDate.getDate() + 1)
    minDate = new Date(minDate)

    return (
        <div>
            {
                !cartEmpty ? (
                    <DatePickerRainbow
                        labelAlignment="left"
                        disabled
                        label="Selecione uma data de entrega"
                        required
                        placeholder="Selecione uma data"
                        value={dateState}
                        maxDate={maxDate}
                        minDate={minDate}
                        onChange={(value) => setDateState(value)}
                    />
                ) :
                    error && !dateState ? (
                        <DatePickerRainbow
                            labelAlignment="left"
                            label="Selecione uma data de entrega"
                            required
                            error="É nescessario selecionar uma data"
                            placeholder="Selecione uma data"
                            value={dateState}
                            maxDate={maxDate}
                            minDate={minDate}
                            onChange={(value) => setDateState(value)}
                            theme={{ borderColor: "#FF5C5C" }}
                        />
                    ) :
                        <DatePickerRainbow
                            labelAlignment="left"
                            label="Selecione uma data de entrega"
                            required
                            placeholder="Selecione uma data"
                            value={dateState}
                            maxDate={maxDate}
                            minDate={minDate}
                            onChange={(value) => setDateState(value)}
                            theme={{ borderColor: "#FF5C5C" }}

                        />
            }

        </div>
    );
};

export default DatePicker;