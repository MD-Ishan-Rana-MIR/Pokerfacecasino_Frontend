interface ValidationErrors {
    email?: string;
}

export function forgetValidate(
    email: string,
    setErrors: (errors: ValidationErrors) => void
) {
    const errors: ValidationErrors = {};

    if (!email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = "Please enter a valid email address";
    }


    setErrors(errors);

    return Object.keys(errors).length === 0;
}