class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const sendError = (err, res) => {
  let { statusCode, message } = err;
  let updatedErr = "";

  console.log(err);
  console.log(err.message);

  switch (err.name) {
    case "MongoError":
      if (err.code.toString() === "11000") {
        updatedErr = { code: 400, msg: "This email is in use" };
        break;
      }
      updatedErr = { code: 400, msg: "Server Error" };
      break;
    case "ValidationError":
      updatedErr = { code: 400, msg: err.message };
      break;
    case "Error":
      if (statusCode.name === "MongoError") {
        if (statusCode.code === 11000) {
          let field = Object.keys(statusCode.keyValue);
          updatedErr = { code: 400, msg: `This ${field[0]} is already in use` };
        } else
          updatedErr = {
            code: 400,
            msg: "Database Error. Please try again later",
          };
      } else updatedErr = "";
      break;
    default:
      updatedErr = "";
      break;
  }

  if (updatedErr) {
    statusCode = updatedErr.code;
    message = updatedErr.msg;
  } else if (!statusCode) {
    statusCode = 500;
    message = "There is an error. Try again later";
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  sendError,
};
