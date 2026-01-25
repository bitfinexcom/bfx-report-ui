export const selectAutoUpdateToast = (state) => state?.electronAutoUpdateToast

export const selectToastVisible = (state) => state?.electronAutoUpdateToast?.visible ?? false
