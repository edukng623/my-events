
const Event = require("../model/event");  

const testEvent = {
    id: "bcd730b7-9582-4c87-bb3e-e9b431206ff7",
    name: "GR Supra Oil Change",
    description: "Discuss how we will proceed with the oil change",
    createdBy: "w-goncalves",
    dueDate: Date.now(),
    attendees: ["w-mechanic", "w-engineer"]
}

const testEvent2 = {
    id: "57243377-cda1-446f-8ded-4151eeb9ff75",
    name: "GR Supra Tyre Change",
    description: "Discuss how we will proceed with the tyre change",
    createdBy: "w-goncalves",
    dueDate: Date.now(),
    attendees: ["w-mechanic"]
}
 
const DEFAULT_SORT_ORDER = -1;
const getEvents = async (req, res) => {
    let events = [testEvent, testEvent2];
 
    // let page = req.query.page;
    // let limit = req.query.limit;
    // We destructure the req.query object to get the page and limit variables from url 
    // Status: ALL, DRAFT, CREATED, COMPLETED
    const { page = 1, limit = 10,   sortBy = "name", sortOrder= DEFAULT_SORT_ORDER, status = "ALL"} = req.query;
    const filter = {};
    if (status && status != "ALL") {
        // If 'name' query parameter is provided, add it to the filter
        filter.status = status;
    }

    let sortData = {};

    sortData[sortBy] = Number.parseInt(sortOrder) ;

    sortData[sortBy] =  sortData[sortBy] > 1 ? 1 :  sortData[sortBy] < -1 ? -1 :  sortData[sortBy]

    try {
        const eventsFound = await Event.find({ ...filter })
        // We multiply the "limit" variables by one just to make sure we pass a number and not a string
        .limit(limit * 1)
        // I don't think i need to explain the math here
        .skip((page - 1) * limit)
        // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
        .sort(sortData)

        // Getting the numbers of products stored in database
        const count = await Event.countDocuments(filter);
        console.log("Events found: " + eventsFound);
        // res.render("events", {events: eventsFound});
        
        res.json({events: eventsFound, total: count});
    }catch (err){
        res.json({events: []})
        // res.render('error', {message: "Error searching Events", error: {status: 500, stack: err}})
    }  
    
}
const getEventById = (req, res) => {
    let event = testEvent2;
    event.id = req.params.id;
    event.name = event.name.concat(event.id);

    res.render("event", event);
}
const createEvent = (req, res) => {
    let event = testEvent;
    // TODO: Ensure extra contraints
    //  1. User validation
    //  2. Others
    console.log(res);
    try{
        Event.create(req.body) 
        .then ( createdEvent => {
            console.log(createdEvent);
            console.log(res.render);
            res.render("event", createdEvent); 
        })
        .catch( err => {
            res.render('error', {message: "Could not create event", error: {status: 400, stack: err}})
        })
    }catch( e) {
        res.render('error', {message: "Could not create event", error: {status: 500, stack: e}})
    }
}
module.exports = {
    listEvents: getEvents,
    getEventById: getEventById,
    createEvent: createEvent
}