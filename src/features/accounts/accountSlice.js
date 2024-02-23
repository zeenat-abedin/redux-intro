const initialStateAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state, loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      balance: state.balance + action.payload.amount};
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === 'USD') 
    return {
      type: "account/deposit",
      payload: amount,
    };      
  return async function (dispatch, getState) {
    //API Call
    const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
    const data = await res.json()
    console.log(data)
    const converted = data.rates.USD

    //return action
    dispatch({
      type: "account/deposit",
      payload: converted
    })
  }
}

export function withdraw(amount) {
  return {
    type: "account/wihdraw",
    payload: amount,
  };
}

export function payLoan(amount) {
  return {
    type: "account/payloan",
    payload: amount,
  };
}

export function requestLoan(amount) {
  return {
    type: "account/requestLoan",
    payload: { amount: 1000, purpose: "Buy a car" },
  };
}
