class ApiError extends Error{
    constructor(
        statusCode,
        meassage = "Something went wrong",
        error = [],
        statck =""
    ){
        super(meassage)
        this.statusCode = statusCode
        this.data = null
        this.message = meassage
        this.success = false;
        this.error = error

        if (statck) {
            this.stack = statck
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}