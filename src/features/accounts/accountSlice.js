import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
  isLoading: false
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) { 
        return {
          payload: {amount, purpose}
        }
       },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      }
    },
    payLoan(state, action) {
      state.balance -= state.loan; 
      state.loan = 0;
      state.loanPurpose = ' ';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }
  },
})

console.log(accountSlice)
export const {deposit,withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;
console.log(requestLoan(1000, "Buy car"))

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return { ...state, balance: state.balance + action.payload , isLoading: false};
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state, loan: action.payload.amount,
//         loanPurpose: action.payload.loanPurpose,
//       balance: state.balance + action.payload.amount};
//     case "account/payloan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return {...state, isLoading: true};
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === 'USD')
//     return {
//       type: "account/deposit",
//       payload: amount,
//     };
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertingCurrency' });

//     //API Call
//     const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
//     const data = await res.json()
//     console.log(data)
//     const converted = data.rates.USD

//     //return action
//     dispatch({
//       type: "account/deposit",
//       payload: converted
//     })
//   }
// }

// export function withdraw(amount) {
//   return {
//     type: "account/wihdraw",
//     payload: amount,
//   };
// }

// export function payLoan(amount) {
//   return {
//     type: "account/payloan",
//     payload: amount,
//   };
// }

// export function requestLoan(amount) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount: 1000, purpose: "Buy a car" },
//   };
// }
