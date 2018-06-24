export function getTimeFrame() {
  // Currently its fixed to last 2 months and no query limit
  const TIME_SHIFT = 60 * 60 * 24 * 30 * 2 // 2 months
  const now = (new Date()).getTime()
  return {
    start: now - TIME_SHIFT,
    end: now,
    // limit: 0, // no limit applied for the first version
  }
}

export default {
  getTimeFrame,
}
