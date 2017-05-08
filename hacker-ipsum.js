const verbs = [
  'disable',
  'update',
  'react',
  'erase',
  'release',
  'deploy',
  'enable',
  'delete'
]

const nounPrefixes = [
  'dependency',
  'distributed',
  'super'
]

const nouns = [
  'matrix',
  'AWS',
  'database',
  'system',
  'node',
  'analyser',
  'network'
]

const nounSuffixes = [
  'project',
  'lambda',
  'alert'
]

const statuses = [
  'offline',
  'online',
  'live',
  'dead'
]

const adjectives = [
  'impossible',
  'fantastic',
  'a mess',
  'noisy',
  'advanced'
]

const templates = [
  'We need to ${verb} the ${noun} before we can ${verb} the ${noun}',
  'Prepare to ${verb} version ${number} of the ${noun}',
  '${noun} has been ${status} since ${date}. ${verb}!',
  '${verb}. ${verb}. ${verb}.',
  'Yes, of course it is ${adjective}. I made sure to ${verb} and ${verb} the ${noun}',
  'I know it is ${status}. You did not ${verb} the ${noun} ${noun} ${noun}!',
  '${noun} is ${adjective}. Please ${verb} and ${verb}',
  '${verb} the ${noun} before ${noun} becomes ${adjective}'
]

const pickRandom = array => array[Math.floor(Math.random() * array.length)]

const normaliser = (string, beginning, end) => {
  const beginningIndex = string.indexOf(beginning)
  const endIndex = string.indexOf(end)

  if (beginningIndex < 0 || endIndex < 0) return string
  return string.slice(beginningIndex, endIndex + 1)
}

const coinFlip = _ => Math.random() <= 0.5

const grammarise = paragraph => {
  const sentences = paragraph.split('. ')

  const grammarisedSentences = sentences.map(sentence => {
    const firstLetter = sentence[0]

    return sentence.replace(firstLetter, firstLetter.toUpperCase())
  })

  return grammarisedSentences.join('. ')
}

function getRandomReplacement (token) {
  switch (token) {
    case '${verb}':
      return pickRandom(verbs)
    case '${noun}':
      let word = pickRandom(nouns)
      let nounPrefix
      let nounSuffix

      if (coinFlip()) {
        word = `${pickRandom(nounPrefixes)} ${word}`
      }

      if (coinFlip()) {
        word = `${word} ${pickRandom(nounSuffixes)}`
      }

      return word
    case '${number}':
      return `${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`
    case '${date}':
      return new Date().toLocaleDateString()
    case '${adjective}':
      return pickRandom(adjectives)
    case '${status}':
      return pickRandom(statuses)
    default:
      return token
  }
}

function replacePlaceholder(string) {
  const placeholder = normaliser(string, '$', '}')
  const replacement = getRandomReplacement(placeholder)

  return string.replace(placeholder, replacement)
}

module.exports = _ => {
  const template = pickRandom(templates)

  const tokens = template.split(' ')
    .map(token => replacePlaceholder(token))

  return grammarise(tokens.join(' '))
}
