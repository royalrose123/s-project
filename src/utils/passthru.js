function passthru(literals, ...values) {
  let output = ''
  let index

  for (index = 0; index < values.length; index++) {
    output += literals[index] + values[index]
  }

  output += literals[index]
  return output
}

export default passthru
