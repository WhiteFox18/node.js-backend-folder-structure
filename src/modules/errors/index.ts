import CustomError from "./CustomError";

const Errors = {
  notExists: (fields: string[]) => {
    throw new CustomError({
      statusCode: 404,
      message: "notExists",
      description: "item not exists",
      fields: fields
    })
  },
  unexpectedServerError: () => {
    throw new CustomError({
      statusCode: 500,
      message: "unexpectedServerError",
      description: "unexpected server error occurred",
      fields: []
    })
  }
}

export default Errors