"use strict"
import axios from 'axios';

export function getParticipants(){
    return function(dispatch){
        axios.get('/api/participants')
            .then(function(response){
                dispatch({type:"GET_PARTICIPANTS", payload:response.data})
            })
            .catch(function(err){
                dispatch({"type":"GET_PARTICIPANTS_REJECTED", payload: err})
            })
        }
}

export function postParticipant(newParticipant){
    return function(dispatch){
        axios.post('/api/participants', newParticipant)
            .then(function(response){
                dispatch({type:"POST_PARTICIPANT", payload:response.data})
            })
            .catch(function(err){
                dispatch({type:"POST_PARTICIPANT_REJECTED", payload:err})
            })
    }
}

export function deleteParticipant(id){
    return function(dispatch){
        axios.delete('/api/participants' + id)
            .then(function(response){
                dispatch({type:"DELETE_PARTICIPANT", payload: response.data._id})
            })
            .catch(function(err){
                dispatch({type:"DELETE_PARTICIPANT_REJECTED", payload:err})
            })
    }
}

export function updateParticipant(participant){
    return function(dispatch){
        axios.put('/api/participants', participant)
            .then(function(response){
                dispatch({type:"UPDATE_PARTICIPANT", payload: response.data})
            })
            .catch(function(err){
                dispatch({type:"UPDATE_PARTICIPANT_REJECTED", payload: err})
            })    
    }
}

export function sortParticipants(sortedList){
    return function(dispatch){
        dispatch({type:"SORT_PARTICIPANTS", payload: sortedList})
    }
}