import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import { customerReducer } from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer
})

const store = createStore(rootReducer);

function createCustomer(fullName, nationalID) {
  return {
    type: 'customer/createCustomer',
    payload: {
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