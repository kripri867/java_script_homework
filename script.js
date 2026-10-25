let firstName = 'tARAS'
let lastName = 'shevchenko'
let birthYear = '1994'
let email = 'Taras.Shevchenko@Gmail.com'
let isSubscribed = true
let nickname
let visits = 0
const currentYear = 2026

console.log(typeof birthYear)
let birthYearNumber = Number(birthYear)
console.log(typeof birthYearNumber, birthYearNumber)

let age = currentYear - birthYearNumber
let age10 = age + 10
console.log(age, age10)

let normalizedFirstName =
	firstName[0].toUpperCase() + firstName.slice(1).toLowerCase()
let normalizedLastName =
	lastName[0].toUpperCase() + lastName.slice(1).toLowerCase()
console.log(normalizedFirstName, normalizedLastName)

let fullName = normalizedFirstName + ' ' + normalizedLastName
console.log(fullName, fullName.length)

let atIndex = email.indexOf('@')
console.log(atIndex)

let login = email.slice(0, atIndex)
let domain = email.slice(atIndex + 1).toLowerCase()
console.log(login, domain)

let maskedEmail = login.slice(0, 2) + '***@' + domain
console.log(maskedEmail)

let isAdult = age >= 18
console.log(isAdult, typeof isAdult)

console.log(isAdult && isSubscribed)
console.log(isAdult || isSubscribed)
console.log(!isSubscribed)

let displayName = nickname || fullName
console.log(displayName)

let livedDays = Math.round(age * 365.25)
console.log(livedDays)

let confirmCode = Math.floor(Math.random() * 9000) + 1000
console.log(confirmCode)

let firstVisitResult = visits++
console.log(firstVisitResult, visits)
let secondVisitResult = ++visits
console.log(secondVisitResult, visits)

let userCard = `Користувач: ${fullName}
Показувати як: ${displayName}
Вік: ${age} (через 10 років — ${age10})
Email: ${maskedEmail}
Повнолітній: ${isAdult}
Підписка: ${isSubscribed}
Входів: ${visits}
Прожито днів: ${livedDays}
Код підтвердження: ${confirmCode}`;

console.log(userCard);
