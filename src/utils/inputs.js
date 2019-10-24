export const selectTextOnFocus = (e) => {
  const { target } = e
  target.select()
}

export default {
  selectTextOnFocus,
}
