module.exports = (message,status) =>{

    const newError = new Error(message);

    newError.status = status;

    return newError

}