
export default class OrdersAnalyzer {
    constructor() {
        this.weekdays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
        this.output = {};
    }

    averageDailySales(productId, orders) {
        console.log(productId)
        
        let counter = {}
        this.weekdays.forEach((weekday, index) => {
            counter[index] = 0
        })
        
        this.output[productId] = counter

        orders.forEach(order => {
            let dayOfWeekNumber = new Date(order.creationDate).getDay()
            let orderLines = order.orderLines
            let ordersByDay = orderLines.filter(product => product.productId == productId)
            if (ordersByDay.length > 0)
                // console.log(ordersByDay[0])
                this.output[productId][dayOfWeekNumber] += ordersByDay[0].quantity
        });

        console.log(this.output)
        return {};
    }
}
