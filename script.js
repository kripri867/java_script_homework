const orderObj = {
	id: 1024,
	customer: { firstName: 'John', lastName: 'Smith', age: 15 },
	priceStr: '1099.99 грн',
	quantityStr: '3',
	deliveryDay: 3,
	tempNote: 'службова нотатка, видалити перед відправкою',
}

orderObj.city = 'Київ'

'tempNote' in orderObj
delete orderObj.tempNote
'tempNote' in orderObj

const backupOrder = structuredClone(orderObj)
backupOrder.customer.firstName = 'Ann'

const paidOrder = Object.assign({}, orderObj, { status: 'paid' })

const price = parseFloat(orderObj.priceStr)
const quantity = Number(orderObj.quantityStr)
const total = price * quantity

const age = orderObj.customer.age
const discount = age < 18 ? 0.1 : age <= 60 ? 0 : 0.15
const finalTotal = total * (1 - discount)

let deliveryPrice
if (finalTotal < 500) {
	deliveryPrice = 100
} else if (finalTotal <= 1500) {
	deliveryPrice = 50
} else {
	deliveryPrice = 0
}

function getDeliveryDayName(day) {
	let deliveryDayName

	switch (day) {
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

	return deliveryDayName
}

const deliveryDayName = getDeliveryDayName(orderObj.deliveryDay)

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