export const getContentsStart = () => ({
    type: 'GET_CONTENTS_START',
})

export const getContentsSuccess = (content) => ({
    type: 'GET_CONTENTS_SUCCESS',
    payload: content
})

export const getContentsFailure = () => ({
    type: 'GET_CONTENTS_FAILURE',
})


export const createContentsStart = () => ({
    type: 'CREATE_CONTENTS_START',
})

export const createContentsSuccess = (content) => ({
    type: 'CREATE_CONTENTS_SUCCESS',
    payload: content
})

export const createContentsFailure = () => ({
    type: 'CREATE_CONTENTS_FAILURE',
})


export const deleteContentsStart = () => ({
    type: 'DELETE_CONTENTS_START',
})

export const deleteContentsSuccess = (id) => ({
    type: 'DELETE_CONTENTS_SUCCESS',
    payload: id
})

export const deleteContentsFailure = () => ({
    type: 'DELETE_CONTENTS_FAILURE',
})