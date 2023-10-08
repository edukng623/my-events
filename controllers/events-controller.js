
const Event = require("../model/event");  
const User = require("../model/user");   
const DEFAULT_SORT_ORDER = -1;
const getEvents = async (req, res) => { 
 
    // let page = req.query.page;
    // let limit = req.query.limit;
    // We destructure the req.query object to get the page and limit variables from url 
    // Status: ALL, DRAFT, CREATED, COMPLETED
    const { page = 1, limit = 10,   sortBy = "name", sortOrder= DEFAULT_SORT_ORDER, status = "ALL"} = req.query;
    const filter = {};
    if (status && status != "ALL") { 
        filter.status = status;
    }

    let sortData = {};

    sortData[sortBy] = Number.parseInt(sortOrder) ;

    sortData[sortBy] =  sortData[sortBy] > 1 ? 1 :  sortData[sortBy] < -1 ? -1 :  sortData[sortBy]

    try {
        const eventsFound = await Event.find({ ...filter }) 
        .limit(limit * 1) 
        .skip((page - 1) * limit) 
        .sort(sortData)
        
 
        const count = await Event.countDocuments(filter);
        console.log("Events found: " + eventsFound);
        // res.render("events", {events: eventsFound}); 
        res.json({events: eventsFound, total: count});
    }catch (err){
        console.log(err);
        res.statusMessage = "Error getting Events"  ;
        res.status(500).end();
    }  
    
}
const getEventById = async (req, res) => {  
    try{
        const event = await Event.findById(req.params.id ); 
        res.json(event);
    }catch(exception){
        console.log(exception)
        res.statusMessage = "Could not retrieve Event with ID: " +  req.params.id ;
        res.status(500).end();
    }
}
const createEvent = (req, res) => { 
    // TODO: Ensure extra contraints
    //  1. User validation
    //  2. Others
    console.log(res);
    req.body.attendees = [req.body.createdBy, "6521ff2f8e91ed4080255e5e", "6521ff438e91ed4080255e60"];
    try{
        Event.create(req.body) 
        .then ( createdEvent => {
            console.log(createdEvent);
            console.log(res.render);
            res.render("event", createdEvent); 
        })
        .catch( err => {
            console.log(err);
            res.statusMessage = "Could not Create Event"  ;
            res.status(500).end();
        })
    }catch( e) { 
        console.log(e);
        res.statusMessage = "Could not Create Event"  ;
        res.status(500).end();
    }
}
module.exports = {
    listEvents: getEvents,
    getEventById: getEventById,
    createEvent: createEvent
}