import { createStore } from "redux";

const initialState = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "loan":
      if (state.loan > 0) return state;
      return { ...state, loan: action.payload };
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

const store = createStore(reducer);

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/wihdraw",
    payload: amount,
  };
}

function payLoan(amount) {
  return {
    type: "account/payloan",
    payload: amount,
  };
}

function requestLoan(amount) {
  return {
    type: "account/requestLoan",
    payload: { amount: 1000, purpose: "Buy a car" },
  };
}

store.dispatch(deposit(500));
