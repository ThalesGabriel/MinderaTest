
export default class OrdersAnalyzer {
    constructor() {
        this.weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        this.output = {}
    }

    buildOutputObject(productId) {
        this.output[productId] = {}
        this.weekdays.forEach(weekday => {
            this.output[productId][weekday] = 0
        })
    }

    averageDailySales(productId, orders) {
        const c = {}

        this.buildOutputObject(productId)

        orders.forEach(order => {
            let dayOfWeekNumber = new Date(order.creationDate).getDay()
            let orderLines = order.orderLines
            let ordersByDay = orderLines.filter(product => product.productId == productId)
            if (ordersByDay.length > 0) {
                let preSet = c[dayOfWeekNumber] ? [...c[dayOfWeekNumber]] : []
                c[dayOfWeekNumber] = [...ordersByDay, ...preSet]
            }
        });
        
        const reducer = (previousValue, currentValue) => previousValue.quantity + currentValue.quantity;

        Object.keys(c).forEach(key => {
            let averageDailySale = c[key] = c[key].length > 1? Math.ceil(c[key].reduce(reducer)/c[key].length) : c[key][0].quantity
            this.output[productId][this.weekdays[key]] = averageDailySale
        })

        return this.output[productId];
    }
}
