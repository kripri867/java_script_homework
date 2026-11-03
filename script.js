const memberObj = {
	name: 'Olena',
	yearOfBirth: 1998,
	city: 'Львів',
	booksPerMonth: 3,
	favoriteGenre: 'фентезі',
}
function memberCard(name, yearOfBirth, favoriteGenre, city = 'Київ') {
	let result = ''

	if (name) {
		result += `My name is ${name}.`
	}

	if (yearOfBirth) {
		const currentYear = new Date().getFullYear()
		const age = currentYear - yearOfBirth
		result += `I am ${age} years old.`
	}

	if (favoriteGenre) {
		result += `I read ${favoriteGenre}.`
	}

	result += `I live in ${city}.`

	return result
}
function describeMember(obj) {
	let result = ''
	for (const key in obj) {
		result += `${key}: ${obj[key]};`
	}
	return result.trim()
}
