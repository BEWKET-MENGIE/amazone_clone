import { Type } from './action.type';

export const initialState = {
  basket: [],
  user: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      // Check if the item already exists in the basket
      const existingItemIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex >= 0) {
        // If it exists, increase its quantity (amount)
        const updatedBasket = state.basket.map((item, index) => {
          if (index === existingItemIndex) {
            return {
              ...item,
              amount: (item.amount || 1) + 1,
            };
          }
          return item;
        });

        return {
          ...state,
          basket: updatedBasket,
        };
      } else {
        // If it's a new item, add it with amount = 1
        return {
          ...state,
          basket: [...state.basket, { ...action.item, amount: 1 }],
        };
      }

    case Type.REMOVE_FROM_BASKET:
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        // If item amount is greater than 1, decrement amount, otherwise remove it
        if (newBasket[index].amount > 1) {
          newBasket[index] = {
            ...newBasket[index],
            amount: newBasket[index].amount - 1,
          };
        } else {
          newBasket.splice(index, 1);
        }
      } else {
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case Type.EMPTY_BASKET:
      return {
        ...state,
        basket: [],
      };

    case Type.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
