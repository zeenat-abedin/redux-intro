import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: ""
};

function accountReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case 'customer/createCustomer':
      return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt };
    case 'customer/updateName':
      return {
        ...state,
        fullName: action.payload,
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer);

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

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer', payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString()
    }
  }
}

function updateName(fullName) {
  return {
    type: 'account/updateName',
    payload: fullName
  }
}