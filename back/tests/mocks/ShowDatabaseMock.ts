import { BaseDatabase } from "../../src/database/BaseDatabase"
import { IShowDB, ITicketDB, IUserAlreadyBoughtTicket } from "../../src/models/Show"
import moment from "moment"


const showList: IShowDB[] = [
    {
        id: "id1",
        band: "band1",
        starts_at: new Date(2022, 15, 5),
    },
    {
        id: "id2",
        band: "band2",
        starts_at: new Date(2022, 12, 6),
    },
    {
        id: "id3",
        band: "band3",
        starts_at: new Date(2022, 12, 7),
    },
    {
        id: "id4",
        band: "band4",
        starts_at: new Date(2021, 12, 8),
    },
    {
        id: "id5",
        band: "band5",
        starts_at: new Date(2021, 12, 9),
    },
]

const ticketList: ITicketDB[] = [
    {
        id: "ticket1",
        user_id: "id-mock",
        show_id: "id1",
    },
    {
        id: "ticket2",
        user_id: "id-mock",
        show_id: "id2",
    },
    {
        id: "ticket3",
        user_id: "id-mock2",
        show_id: "id1",
    },
    {
        id: "ticket5",
        user_id: "id-mock",
        show_id: "id5",
    }
]




export class ShowDatabaseMock extends BaseDatabase {
    public static TABLE_SHOWS = "Lama_Shows"
    public static TABLE_TICKETS = "Lama_Tickets"

    public deleteBuyTicket = async (input: IUserAlreadyBoughtTicket): Promise<void> => { }
    public insertBuyTicket = async (input: ITicketDB): Promise<void> => { }
    public createShow = async (input: IShowDB): Promise<void> => { }



    public selectTicketByUserIdAndShowId = async (input: IUserAlreadyBoughtTicket): Promise<any> => {
        const result = ticketList.filter((ticket) => {
            return ticket.user_id === input.userId && ticket.show_id === input.showId
        })

        return result.length ? result : []
    }

    public selectShowById = async (id: string): Promise<any> => {
        switch (id) {
            case "id1":
                return [showList[0]]
            case "id2":
                return [showList[1]]
            case "id3":
                return [showList[2]]
            case "id4":
                return [showList[3]]
            case "id5":
                return [showList[4]]
            default:
                return []
        }
    }

    public selectShowsByDate = async (date: string): Promise<any> => {

        const day = moment(date, "YYYY/MM/DD").format("DD")
        const month = moment(date, "YYYY/MM/DD").format("MM")
        const year = moment(date, "YYYY/MM/DD").format("YYYY")

        switch(`${year}-${month}-${day}`) {
            case "2022-12-05":
                return [showList[0]]
            case "2022-12-06":
                return [showList[1]]
            case "2022-12-07":
                return [showList[2]]
            default:
                return []
        }

    }


    public selectShows = async (): Promise<any> => {
        return showList
    }

}