


// const state = {
//     board : [{id : '1'}]
//   };
  
// const actions = {
        
//      loadBoard({ commit }, state) {
       
//         // try {
            
//         //     var param = {
//         //         category_id : this.$route.params.bid,
//         //         user_id : this.$store.state.l.user.userid
//         //     }
  
//         //     /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
//         //     const data = helper.getJSON("board_get", param)
           
//         //     if(data === null){ return }
            
//         //      data.then(function(result){
  
//         //       state.board = result;  

//         //     })
            
//         //   } catch (err) { 
//         //   }
//         console.log('asdf')
//         commit('Board');
//     }
 
//   };

// // export const boardState = {
// //     namespaced: true,
// //     state: {
// //         board : []
// //     },
// //     actions: {
// //         [loadBoard]({ commit }, state) {
// //             try {
// //                 var param = {
// //                     category_id : this.$route.params.bid,
// //                     user_id : this.$store.state.l.user.userid
// //                 }
      
// //                 /// 바로 데이터를 받아와서 하려면 async, await를 사용해야함
// //                 const data = helper.getJSON("board_get", param)
               
// //                 if(data === null){ return }
                
// //                  data.then(function(result){
      
// //                   state.board = result;  

// //                 })
                
// //               } catch (err) { 
// //               }
// //             commit('loadBoard');
// //         },
        
// //     }
// // }



// export default {
//     namespaced: true,
//     state,
//     actions
//   };
const SET_CLIENTS = 'SET_CLIENTS'

export default {
     state : {
        'fields': [
            {
              'field': 'name',
              'label': 'Nom'
            },
            {
              'field': 'adresse',
              'label': 'Adresse'
            },
            {
              'field': 'amount',
              'label': 'Amount'
            },
            {
              'field': 'contact',
              'label': 'Contact'
            }
        ],
        items : []
    },
    
     
    
     mutations  : {
        [SET_CLIENTS] (state, clients) {
          state.items = clients;
        }
    },
    
     actions :  {
        init: ({ commit }, payload) => {
            let clients = []
            for(let i = 0; i < 100; i++){
                clients.push({
                    'name': 'Client '+i,
                    'adresse': '14000 Caen',
                    'amount': '1000',
                    'contact': 'contact@client'+i+'.com'
                })
            }
            commit(SET_CLIENTS, { clients })
        }
    },
    
     getters  :  {
        clients (state) {
            return state.items;
        },
        fields (state) {
            return state.fields;
        }
    }
    
}