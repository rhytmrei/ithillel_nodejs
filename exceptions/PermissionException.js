class PermissionException extends Error {
    constructor(message = "Permission denied") {
        super(message);
        this.name = this.constructor.name;
    }

    toString() {
        return `${this.name} ${this.message}`;
    }
}

export default PermissionException;
