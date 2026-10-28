const orderObj = {
	id: 1024,
	customer: { firstName: 'John', lastName: 'Smith', age: 15 },
	priceStr: '1099.99 грн',
	quantityStr: '3',
	deliveryDay: 3,
	tempNote: 'службова нотатка, видалити перед відправкою',
}

orderObj.city = 'Київ'
console.log(
	`${orderObj.customer.firstName} ${orderObj.customer.lastName} from ${orderObj.city}`,
)

console.log('tempNote в orderObj:', 'tempNote' in orderObj)
delete orderObj.tempNote
console.log('tempNote в orderObj:', 'tempNote' in orderObj)

const backupOrder = structuredClone(orderObj)
backupOrder.customer.firstName = 'Ann'
console.log(
	'Оригінал (orderObj.customer.firstName):',
	orderObj.customer.firstName,
)
console.log(
	'Копія (backupOrder.customer.firstName):',
	backupOrder.customer.firstName,
)

const paidOrder = Object.assign({}, orderObj, { status: 'paid' })
console.log('status у paidOrder:', paidOrder.status)
console.log('status у orderObj:', orderObj.status)

const prise = parseFloat(orderObj.priceStr)
const quantity = Number(orderObj.quantityStr)
const total = prise * quantity
console.log('Price:', price)
console.log('Quantity:', quantity)
console.log('Total:', total)

const age = orderObj.customer.age
const discount = age < 18 ? 0.1 : age <= 60 ? 0 : 0.15
const finalTotal = total * (1 - discount)
console.log('Discount:', discount)
console.log('Final Total:', finalTotal)

let deliveryPrice
if (finalTotal < 500) {
	deliveryPrice = 100
} else if (finalTotal <= 1500) {
	deliveryPrice = 50
} else {
	deliveryPrice = 0
}
console.log('Delivery Price:', deliveryPrice)

let deliveryDayName

switch (orderObj.deliveryDay) {
	case 1:
		deliveryDayName = 'Понеділок'
		break
	case 2:
		deliveryDayName = 'Вівторок'
		break
	case 3:
		deliveryDayName = 'Середа'
		break
	case 4:
		deliveryDayName = 'Четвер'
		break
	case 5:
		deliveryDayName = 'П’ятниця'
		break
	case 6:
		deliveryDayName = 'Субота'
		break
	case 7:
		deliveryDayName = 'Неділя'
		break
	default:
		deliveryDayName = 'Невідомий день'
}
console.log('Delivery Day Name:', deliveryDayName)

let bonusSum = 0
for (let i = 1, limit = 20; i <= limit; i++) {
	if (i % 3 === 0) {
		continue
	}
	bonusSum += i
	if (bonusSum > 50) {
		break
	}
}

console.log('bonusSum →', bonusSum)
