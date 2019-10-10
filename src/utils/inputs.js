export const selectTextOnFocus = (e) => {
  const { target } = e
  target.select()
  // setTimeout(() => { target.select() }, 25)
}

export default {
  selectTextOnFocus,
}
