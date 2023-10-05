const mongoose = require("mongoose"); 
const uuid4 = require('uuid4');

//TODO: Use mongoose.Types.UUID;
const EVENT_STATUS =  ['DRAFT', 'SCHEDULED', 'COMPLETED'];
const eventSchema = mongoose.Schema(
    { 
        // Auto ID
        name: {
            type: String,
            required: [true, "Event name cannot be empty"],
        },
        creationDate: {
            type: Date,
            default: mongoose.now,
            required: [true, "Creation date cannot be empty"],
        },
        createdBy: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: EVENT_STATUS,
            default: EVENT_STATUS[0]
        },
        attendees: {
            type: [String],
        }
    },
    {
        timestamps: true
    }
);

module.exports = eventSchema;