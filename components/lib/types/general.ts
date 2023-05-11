type LineItem = {
    title: string;
    price_str: string;
    price: number;
    piece: string;
    options1: string;
    options2: string;
    options3: string;
    product_id: string;
    high_risk: boolean;
};

type Shipping = {
    line1: string;
    state: string;
    city: string;
    zip: string;
    type: string;
    country: string;
    name: string;
    title: string;
};

type Customer = {
    email: string;
    first_name: string;
};
  
export type InitialValues = {
    line_items: LineItem[];
    shipping: Shipping;
    bump: boolean;
    external_type: string;
    customer: Customer;
    stripe_uuid: string;
    fun_uuid: string;
    high_risk: boolean;
};
  