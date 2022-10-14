const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: null,
        delivery: null,
        showBasket: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: state.update3,
        delivery: state.delivery,
        showBasket: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
        update: state.update,
        update2: state.update2,
        update3: null,
        delivery: null,
        showBasket: false,
      };
      case "UPDATE_START":
        return {
          ...state,
          isFetching:true,
          update: state.update,
          update2: state.update2,
          update3: state.update3,
          delivery: state.delivery,
          showBasket: false,
        };
      case "UPDATE_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
          update: state.update,
          update2: state.update2,
          update3: state.update3,
          delivery: state.delivery,
          showBasket: false,
        };
      case "UPDATE_FAILURE":
        return {
          user: state.user,
          isFetching: false,
          error: true,
          update: state.update,
          update2: state.update2,
          update3: state.update3,
          delivery: state.delivery,
          showBasket: false,
        };
    case "LOGOUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: null,
        delivery: null,
        showBasket: false,
      };
    case "UPDATE":
      return {
        user: state.user,
        isFetching: false,
        error: false,
        update: !state.update,
        update2: state.update2,
        update3: state.update3,
        delivery: state.delivery,
        showBasket: state.showBasket,
      };
    case "UPDATE2":
      return {
        user: state.user,
        isFetching: false,
        error: false,
        update: state.update,
        update2: !state.update2,
        update3: state.update3,
        delivery: state.delivery,
        showBasket: state.showBasket,
      };
    case "UPDATE3":
      return {
        user: state.user,
        isFetching: false,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: action.payload,
        delivery: state.delivery,
        showBasket: state.showBasket,
      };
    case "DELIVERY":
      return {
        user: state.user,
        isFetching: false,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: state.update3,
        delivery: action.payload,
        showBasket: state.showBasket,
      };
    case "SHOWBASKET":
      return {
        user: state.user,
        isFetching: false,
        error: false,
        update: state.update,
        update2: state.update2,
        update3: state.update3,
        delivery: state.delivery,
        showBasket: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
