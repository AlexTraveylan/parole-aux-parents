export function generateCode(): string {
  const uppercaseCount = 2
  const digitCount = 1

  // Générer les caractères requis en majuscules
  let randomString = ""
  for (let i = 0; i < uppercaseCount; i++) {
    const randomUppercase = String.fromCharCode(65 + Math.floor(Math.random() * 26)) // 65 correspond au code ASCII de 'A'
    randomString += randomUppercase
  }

  // Générer le chiffre requis
  const randomDigit = String.fromCharCode(48 + Math.floor(Math.random() * 10)) // 48 correspond au code ASCII de '0'
  randomString += randomDigit

  // Générer le reste de la chaîne
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  for (let i = uppercaseCount + digitCount; i < 8; i++) {
    const randomChar = characters[Math.floor(Math.random() * characters.length)]
    randomString += randomChar
  }

  return randomString
}
