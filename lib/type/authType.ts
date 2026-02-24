export interface LoginApiResponsetype {
    status: boolean;
    message: string;
    data: {
        token: string;
        token_type: string;
        expires_in: string;
        user: {
            id: number;
            full_name: string;
            role: string;
            email: string;
            email_verified_at: string;
            status: string;
            otp_verified_at: null | string;
            otp: null | number;
            otp_expires_at: null | string;
            phone_number: null | string;
            address: null | string;
            avatar: string | null;
            wallet_address: string | null;
            signature: string | null;
            nonce: string | null;
            created_at: string;
            updated_at: string;
            avatar_url: string
        }
    }
}

export interface AdminLoginPayloadType {
    email: string;
    password: string;
}