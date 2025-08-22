const handleError = (res, error, status = 500, message = "Internal server error") => {
  // Support both signatures:
  // 1) handleError(res, errorObj, status, message)
  // 2) handleError(res, messageString, status)
  const isStringAsMessage = typeof error === "string" && message === "Internal server error";

  const resolvedMessage = isStringAsMessage ? error : message;
  const errorMessage = isStringAsMessage ? undefined : (error?.message || error);
  const errorStack = process.env.NODE_ENV === "development" ? error?.stack : undefined;

  if (process.env.NODE_ENV === "development") {
    console.error(`[Error] ${resolvedMessage}: ${errorMessage || ""}`);
  }

  const payload = { success: false, message: resolvedMessage };
  if (errorMessage) payload.error = errorMessage;
  if (errorStack) payload.errorStack = errorStack;

  return res.status(status).json(payload);
};

export default handleError;
