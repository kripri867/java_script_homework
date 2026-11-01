const memberObj = {
	name: 'Olena',
	yearOfBirth: 1998,
	city: 'Львів',
	booksPerMonth: 3,
	favoriteGenre: 'фентезі',
}
function memberCard(name, yearOfBirth, favoriteGenre, city = 'Київ') {
	let result = ''
	if (typeof name !== 'undefined') {
		result += `My name is ${name}. `
	}
	if (typeof yearOfBirth !== 'undefined') {
		const currentYear = new Date().getFullYear()
		const age = currentYear - yearOfBirth
		result += `I am ${age} years old. `
	}
	if (typeof favoriteGenre !== 'undefined') {
		result += `I read ${favoriteGenre}. `
	}
	result += `I live in ${city}.`
	return result
}
console.log( memberCard( ' Олена', 1998, 'фентезі', 'Львів') )
console.log( memberCard( ' Олена', 1998, 'фентезі',) )
console.log( memberCard( ' Олена', 1998, 'undefined', 'Львів') )

//676767676767676767676766767676767667676

function describeMember(obj) {
  let result = '';
  for (const key in obj) {
    result += `${key}: ${obj[key]}. `;
  }
  return result.trim();
}

console.log(describeMember(memberObj));