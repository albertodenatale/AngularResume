import { Node } from './../navigation/navigation';
import moment from 'moment';

export class Experience extends Node {
    constructor() {
        super();

        this.path = [];
        this.title = "Position";
        this.place = "Place";
        this.description = "description";
        this.period = {
            from: new Date().getMilliseconds(),
            to: new Date().getMilliseconds()
        };
        this.path = ["new"];
        this.currentPosition = 0;
    }

    title: string;
    place: string;
    description: string;
    period: Period;
    subnav: Array<Node>;
    relevancy: number;
    currentPosition: number;
    currentDelta: number;
}

export class Period {
    from: number;
    to: number;
}

export function ParsePeriod(period: string): Period {
    if (period == null) {
        return new Period();
    }

    let dates: string[] = period.split("-");

    if(dates.length == 1){
        dates = period.split("–");
    }

    let from: string = dates[0];
    let to: string = dates[1];

    
    let dateFrom: number = moment(from, "MMMM YYYY").unix();
    let dateTo: number = null;

    if(to){
        let dateTo: number = moment(to, "MMMM YYYY").unix();
    }

    return <Period>{
        from: dateFrom,
        to: dateTo
    }
}

export function formatPeriod(period:Period): string {
    let dateFrom : string = moment.unix(period.from).format("MMMM YYYY");
    var dateTo = "Today";
    
    if(period.to){
        var dateTo = moment.unix(period.to).format("MMMM YYYY");
    }

    return dateFrom.concat(" - ").concat(dateTo);
}
