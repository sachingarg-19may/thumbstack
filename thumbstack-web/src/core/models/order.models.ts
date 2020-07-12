export class OrderModel {
    id: number;
    customerName: string;
    status: string;
    foodTotal: number;
    tipAmount: number;
    totalAmount: number;
    tipPercentage: number;
    items: OrderItemModel[];
}

export class OrderItemModel {
    foodItemId: number;
    name: string;
    cost: number;
    quantity: number;
}

export class AddUpdateOderModel {
    customerName: string;
    items: OrderItemModel[];
}

export class CheckOutModel {
    orderId: number;
    tipPercentage: number;
}