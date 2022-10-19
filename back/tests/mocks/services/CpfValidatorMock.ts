export class CpfValidatorMock {

    public CpfChecker = (strCPF: string): boolean => {
        switch (strCPF) {
            case '11111111111':
                return false;
            case '22222222222':
                return true;
            default:
                return true;
        }
    }

    public CpfMask = (strCPF: string): string => {
        let cpf: string =  strCPF.replace(/[^\d]+/g, '');
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

}