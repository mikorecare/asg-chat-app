import { timestamp } from "rxjs";




 let chats = new Schema({

    users: 
    [{
        user1: {type: mongoose.Types.ObjectId()},

    },
    {
        user2: {type:mongoose.Types.ObjectId()},
    }

    ],
    messages: 
    [
        {
        message: {
            type: String,
            }
        },
        {
        sender: {types:mongoose.Types.ObjectId(),
                require: true},
        },
        {
            time:{ types: timestamp,
            require: true  }
        }
    ],
 
    collection: 'chats'
  })

  
  module.exports = mongoose.model("chats", chats);