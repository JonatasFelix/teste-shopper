import { DatePicker as DatePickerRainbow } from "react-rainbow-components";

// DATE PICKER - REACT RAINBOW COMPONENTS
// RECEBE COMO PROPRIEDADES O ESTADO DA DATA, O SETTER DO ESTADO DA DATA, O ERRO E SE O CARRINHO ESTÁ VAZIO


const DatePicker = ({ dateState, setDateState, error, cartEmpty }) => {

    // GERA A DATA ATUAL + 30 DIAS
    let maxDate = new Date()
    maxDate = maxDate.setDate(maxDate.getDate() + 30)
    maxDate = new Date(maxDate)

    // GERA A DATA ATUAL + 1 DIA
    let minDate = new Date()
    minDate = minDate.setDate(minDate.getDate() + 1)
    minDate = new Date(minDate)

    return (
        <div>
            {
                !cartEmpty ? (                      // SE O CARRINHO ESTIVER VAZIO - MOSTRA O DATE PICKER DESABILITADO
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
                    error && !dateState ? (             // SE O ERRO ESTIVER ATIVO E A DATA NÃO ESTIVER DEFINIDA - MOSTRA O DATE PICKER COM ERRO
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
                        />
                    ) :
                        <DatePickerRainbow                      // SE NÃO ESTIVER NENHUM DOS CASOS ACIMA - MOSTRA O DATE PICKER NORMAL
                            labelAlignment="left"
                            label="Selecione uma data de entrega"
                            required
                            placeholder="Selecione uma data"
                            value={dateState}
                            maxDate={maxDate}
                            minDate={minDate}
                            onChange={(value) => setDateState(value)}
                        />
            }

        </div>
    );
}

export default DatePicker;