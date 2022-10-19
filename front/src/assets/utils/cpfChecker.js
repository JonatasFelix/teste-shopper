export const cpfChecker = (strCPF) => {
    let cpf =  strCPF.toString().replace(/[^\d]+/g, '');
    let sum = 0;
    let Remainder;

    if (new Set(cpf.split('')).size === 1 || cpf.length !== 11) return false

    for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Remainder = (sum * 10) % 11;

    if ((Remainder === 10) || (Remainder === 11)) Remainder = 0;
    if (Remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Remainder = (sum * 10) % 11;

    if ((Remainder === 10) || (Remainder === 11)) Remainder = 0;
    if (Remainder !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}