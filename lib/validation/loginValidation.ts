interface ValidationErrors {
    email?: string;
    password?: string;
}

export function validate(
    email: string,
    password: string,
    setErrors: (errors: ValidationErrors) => void
) {
    const newErrors: ValidationErrors = {};

    if (!email) {
        newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
        newErrors.password = "Password is required";
    } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
}