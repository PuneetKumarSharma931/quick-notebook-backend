const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://puneetkumarsharma:puneetkumarsharma@my-mongo-cluster.mamry.mongodb.net/QuickNotebook?retryWrites=true&w=majority')
.then(()=>{

    console.log("MongoDB Successfully Connected!");
})
.catch(()=>{

    console.log("Some Error Occured!");
});

