const contentReducer = (state, action) => {
    switch (action.type){
        case "GET_CONTENTS_START":
            return{
                content: [],
                isFetching: true,
                error: false
            };
        case "GET_CONTENTS_SUCCESS":
            return{
                content: action.payload,
                isFetching: false,
                error: false
            };
        case "GET_CONTENTS_FAILURE":
            return{
                content: [],
                isFetching: false,
                error: true
            };


            case "CREATE_CONTENTS_START":
                return{
                    ...state,
                    isFetching: true,
                    error: false
                };
            case "CREATE_CONTENTS_SUCCESS":
                return{
                    content: [...state.content, action.payload],
                    isFetching: false,
                    error: false
                };
            case "CREATE_CONTENTS_FAILURE":
                return{
                    ...state,
                    isFetching: false,
                    error: true
                };



        case "DELETE_CONTENTS_START":
            return{
                ...state,
                isFetching: true,
                error: false
            };
        case "DELETE_CONTENTS_SUCCESS":
            return{
                content: state.content.filter((content) => content._id !== action.payload), 
                isFetching: false,
                error: false
            };
        case "DELETE_CONTENTS_FAILURE":
            return{
                ...state,
                isFetching: false,
                error: true
            };
            default:
                return { ...state };        
    }
}

export default contentReducer