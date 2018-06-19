export function getTimeFrame() {
  // TODO: implement as a selector and move into state/query
  // const shift = 2 * 7 * 24 * 60 * 60; // 2 weeks
  const now = (new Date()).getTime()
  return {
    start: 0,
    end: now,
    limit: 25,
  }
}

export default {
  getTimeFrame,
}
