"use strict"

export function participantsReducers(state = {
    participants:[]
}, action){
    switch(action.type){
        case "GET_PARTICIPANTS":
            return {...state, participants:[...action.payload]}
        break;

        case "POST_PARTICIPANT":
            return {...state, participants:[...state.participants, action.payload]}
        break;

        case "UPDATE_PARTICIPANT":
            const previousParticipants = [...state.participants];
            const indexToUpdate = previousParticipants.findIndex(
                function(participant){
                    return participant._id == action.payload._id;
                }
            )

            return {participants: [...previousParticipants.slice(0, indexToUpdate),
                action.payload, ...previousParticipants.slice(indexToUpdate + 1)]}
        break;

        case "DELETE_PARTICIPANT":
            const currentParticipants = [...state.participants];
            const indexToDelete = currentParticipants.findIndex(
                function(participant){
                    return participant._id == action.payload;
                }
            )
            
            return {participants:[...currentParticipants.slice(0, indexToDelete),
                 ...currentParticipants.slice(indexToDelete + 1)]}
        break;

        case "SORT_PARTICIPANTS":
                return {...state, participants:[...action.payload]}
        break;
    }
    return state;
}