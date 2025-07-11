export const success = (message: string, data: any = null) => ({
  success: true,
  message,
  data,
});

export const error = (message: string, err: any = {}) => ({
  success: false,
  message,
  error: err,
});
