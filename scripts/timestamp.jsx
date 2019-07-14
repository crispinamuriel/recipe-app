const now = new Date()
const then = new Date('May 2 1999 7:30:23')
const wayBack = new Date('Feburary 20, 2003 9:00:09')

const timestamp = then.getTime()
const myDate = new Date(timestamp)
const timestamp2 = wayBack.getTime()
const mySecondDate = new Date(timestamp2)
//console.log(myDate, mySecondDate)

if (then > wayBack) {
    console.log(wayBack.toString())
} else {
    console.log(then.toString())
}


console.log(now)