class ApiError extends Error{

constructor(statusCode,message="Something Went Wrong",error=[],stack=''){
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.error = error
    this.success = false

    if(stack){
        this.stack = stack
    }
    else{
        Error.captureStackTrace(this,this.stack)
    }
}

}

export {ApiError}