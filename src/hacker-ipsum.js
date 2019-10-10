var hackerate = (function () {
  const verbs = [
    'disable',
    'update',
    'react',
    'erase',
    'release',
    'deploy',
    'enable',
    'delete',
    'turn off',
    'turn on',
    'push',
    'pull',
    'destroy',
    'hack'
  ]

  const nounPrefixes = [
    'dependency',
    'distributed',
    'super',
    'matrix',
    'power',
    'turbo',
    'second-gen'
  ]

  const nouns = [
    'AWS',
    'database',
    'system',
    'node',
    'analyser',
    'process',
    'program'
  ]

  const nounSuffixes = [
    'project',
    'lambda',
    'alert',
    'matrix',
    'network',
    'miner'
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
    'The ${noun} has been ${status} since ${date}. ${verb}!',
    '${verb}. ${verb}. ${verb}.',
    'This is ${adjective}. Can you ${verb} and ${verb} the ${noun}?',
    'The ${noun} is ${status}. We must not ${verb} the ${noun} ${noun}!',
    'The ${noun} is ${adjective}. Please ${verb} and ${verb}',
    '${verb} the ${noun} before ${noun} becomes ${adjective}',
    'The ${noun} will be ${status} by ${date} if we do not ${verb} the ${noun}',
    '${verb} ${number} of ${noun} by ${date}'
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

    const grammarisedSentences = sentences.map(([firstLetter]) => 
      sentence.replace(firstLetter, firstLetter.toUpperCase())
    )

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
        return 'today'
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

  return function () {
    const template = pickRandom(templates)

    const tokens = template.split(' ')
      .map(token => replacePlaceholder(token))

    return grammarise(tokens.join(' '))
  }
})()
