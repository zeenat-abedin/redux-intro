import { useReducer } from "react";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

import "./index.css";
import AccountOperations from "./features/accounts/AccountOperations";
import Customer from "./Customer";
import CreateCustomer from "./CreateCustomer";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type === !"openAccount") return state;

  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 500, isActive: true };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "payLoan":
      return {
        ...state,
        loan: 0,
        balance: state.balance - state.loan,
      };
    case "closeAccount":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;
    default:
      throw new Error("Unknown");
  }
}

 function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div>
      <h1> The React-Redux Bank</h1>
      <CreateCustomer/>
      <Customer/>
      <AccountOperations/>
      <BalanceDisplay/>
    </div>
  );
}

export default App