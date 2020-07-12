export enum FoodItemActionTypes {
    RESET = "[FI]001",
    API_ERROR = "[FI]002",
    API_SUCCESS = "[FI]003",
    RESET_ERROR = "[FI]004",
    LOAD = "[FI]005",
    LOAD_SUCCESS = "[FI]006",
    ADD = "[FI]009",
    ADD_COMPLETE = "[FI]010"
}

export enum OrderActionTypes {
    RESET = "[OR]001",
    API_ERROR = "[OR]002",
    API_SUCCESS = "[OR]003",
    RESET_ERROR = "[OR]004",
    LOAD = "[OR]005",
    LOAD_SUCCESS = "[OR]006",
    ADD = "[OR]007",
    UPDATE = "[OR]008",
    CHECKOUT = "[OR]009",
    UPDATE_COMPLETE = "[OR]010",
    SET_CURRENT = "[OR]011"
}