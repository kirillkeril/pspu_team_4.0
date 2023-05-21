export default class ApiErrors extends Error{
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static Unauthorized() {
        return new ApiErrors(401, "Unauthorized");
    }

    static BadRequest(message, errors) {
        return new ApiErrors(400, message, errors);
    }
}