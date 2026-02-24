type Category = {
    id: number;
    name: string;
};

export interface MarketType {
    id: number;
    titile: string; // probably meant to be 'title'
    category_id: number;
    description: string;
    resulation_roles: string;
    source_of_truth: string;
    source_link: string;
    prediction_close_datetime: string; // can also use Date if parsed
    resulation_datetime: string; // can also use Date if parsed
    status: string;
    created_at: string; // can also use Date if parsed
    updated_at: string; // can also use Date if parsed
    category: Category;
    noPercent: string;
    yesPercent: string
};

export interface AdminMarketType {
    id: number;
    title: string; // probably meant to be 'title'
    category_id: number;
    description: string;
    resulation_roles: string;
    source_of_truth: string;
    source_link: string;
    prediction_close_datetime: string; // can also use Date if parsed
    resulation_datetime: string; // can also use Date if parsed
    status: string;
    created_at: string; // can also use Date if parsed
    updated_at: string; // can also use Date if parsed
    category: Category;
    noPercent: string;
    yesPercent: string
}