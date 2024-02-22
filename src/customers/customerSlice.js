const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: ""
};

export default function customerReducer(state = initialStateCustomer, action) {
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