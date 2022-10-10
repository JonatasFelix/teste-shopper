export class DateConversionMock {
    public toSqlDate = (date: Date): string => {
        return date.toISOString().split("T")[0]
    }

    public toBrazilianDate = (date: Date): string => {
        const dateStr = date.toISOString().split("T")[0]
        const [year, month, day] = dateStr.split("-")
        return `${day}/${month}/${year}`
    }

    public checkDateValidity = (date: string): boolean => {
        return new Date(date).toString() !== "Invalid Date"
    }
}