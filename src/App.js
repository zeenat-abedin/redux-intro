import { useSelector } from "react-redux";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

import "./index.css";
import AccountOperations from "./features/accounts/AccountOperations";
import Customer from "./features/customers/Customer";
import CreateCustomer from "./features/customers/CreateCustomer";


 function App() {
 const fullName = useSelector((state) => state.customer.fullName)
  return (
    <div>
      <h1>🏦 The React-Redux Bank 💷</h1>
      {
        fullName === "" ? (<CreateCustomer />) : (<>
      <Customer/>
      <AccountOperations/>
      <BalanceDisplay/>
        </>)
      }
     
    </div>
  );
}

export default App