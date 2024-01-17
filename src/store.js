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

    default:
      break;
  }
}
