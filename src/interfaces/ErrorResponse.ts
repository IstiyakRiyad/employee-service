interface ErrorResponse {
    errors: {
        message: string,
        field?: string,
        stack?: string
    }[]
}

export default ErrorResponse;