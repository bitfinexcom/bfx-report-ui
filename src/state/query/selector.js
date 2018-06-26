export function getTimeFrame() {
  // Currently its fixed to last 2 weeks and no query limit
  const TIME_SHIFT = 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks
  const now = (new Date()).getTime()
  return {
    start: now - TIME_SHIFT,
    end: now,
    limit: 0, // no limit applied for the first version
  }
}

export default {
  getTimeFrame,
}
