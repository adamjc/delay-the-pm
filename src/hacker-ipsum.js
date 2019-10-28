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

  const goodStatuses = [
    'online',
    'live',
    'ready'
  ]

  const badStatuses = [
    'offline',
    'dead',
    'broken'
  ]

  const adjectives = [
    'impossible',
    'fantastic',
    'a mess',
    'noisy',
    'advanced'
  ]

  const templates = [
    `Sorry, can't right now, we need to {verb} the {noun} before we can {verb} the {noun}`,
    'One moment, prepare to {verb} the {noun}',
    'wait, the {noun} has been {badStatus} since yesterday! {verb}!',
    '{verb}. {verb}. {verb}.',
    'This is {adjective}. Can you {verb} and {verb} the {noun}?',
    'The {noun} is {badStatus}. We must not {verb} the {noun} {noun}!',
    'The {noun} is {adjective}. Please {verb} and {verb}',
    '{verb} the {noun} before {noun} becomes {adjective}',
    'The {noun} will be {badStatus} by {date} if we do not {verb} the {noun}',
    `We've managed to make the {noun} {goodStatus}, now if we can also {verb} it, we might be ok for {date}`
  ]

  const dates = [
    'sometime next week',
    'midnight',
    'today',
    'tomorrow'
  ]

  const pickRandom = array => array[Math.floor(Math.random() * array.length)]

  function normalise (string, beginning, end) {
    const beginningIndex = string.indexOf(beginning)
    const endIndex = string.indexOf(end)

    if (beginningIndex < 0 || endIndex < 0) return string
    return string.slice(beginningIndex, endIndex + 1)
  }

  const coinFlip = _ => Math.random() <= 0.5

  function grammarise (paragraph) {
    const sentences = paragraph.split('. ')

    const grammarisedSentences = sentences.map(([firstLetter, ...rest]) => {
      return firstLetter.toUpperCase() + rest.join('')
    })

    return grammarisedSentences.join('. ')
  }

  function getRandomReplacement (token) {
    switch (token) {
      case '{verb}':
        return pickRandom(verbs)
      case '{noun}':
        let word = pickRandom(nouns)

        if (coinFlip()) {
          word = `${pickRandom(nounPrefixes)} ${word}`
        }

        if (coinFlip()) {
          word = `${word} ${pickRandom(nounSuffixes)}`
        }

        return word
      case '{date}':
        return pickRandom(dates)
      case '{adjective}':
        return pickRandom(adjectives)
      case '{badStatus}':
        return pickRandom(badStatuses)
      case '{goodStatus}':
        return pickRandom(goodStatuses)
      default:
        return token
    }
  }

  function replacePlaceholder(string) {
    const placeholder = normalise(string, '{', '}')
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