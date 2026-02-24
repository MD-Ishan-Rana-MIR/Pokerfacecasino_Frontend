export interface StoredToken {
    token: string;
    expiry: number;
}

// Save token with 5 minute expiry
export function saveToken(token: string) {
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes

    const tokenData: StoredToken = {
        token,
        expiry: expiryTime,
    };

    localStorage.setItem("f-token", JSON.stringify(tokenData));

    // Auto remove after 5 minutes
    setTimeout(() => {
        localStorage.removeItem("f-token");
    }, 5 * 60 * 1000);
}

// Get valid token (auto delete if expired)
export function getValidToken(): string | null {
    const stored = localStorage.getItem("f-token");
    if (!stored) return null;

    const parsed: StoredToken = JSON.parse(stored);

    if (Date.now() > parsed.expiry) {
        localStorage.removeItem("f-token");
        return null;
    }

    return parsed.token;
}

// Remove token manually
export function removeToken() {
    localStorage.removeItem("f-token");
}