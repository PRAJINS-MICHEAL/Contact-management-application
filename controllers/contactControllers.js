const asyncHandler = require("express-async-handler")

const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req , res) => {
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts);
});

//@desc Create contacts
//@route POST /api/contacts
//@access private

const createContact = asyncHandler( async (req , res) => {
    console.log("The contact is ",req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone )
    {
        res.status(400);
        throw new Error("All data are mandatory !");
    }
    
    const contact = await Contact.create(
        {
            name , email , phone, user_id:req.user.id
        }
    )
    res.status(200).json(contact);
    
})

//@desc Get using contacts id
//@route GET /api/contacts/:id
//@access private

const getContactUsingId =asyncHandler(async (req , res) => {

    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found")
    }
    res.status(200).json(contact);
});

//@desc Delete using contacts id
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req , res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User dont have permission to update others contact.")
    } 
    await Contact.deleteOne({"_id":req.params.id});
    res.status(200).json(contact);
});

//@desc Update using contacts id
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req , res) => {

    const contact = await Contact.findById(req.params.id)
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact Not Found")
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User dont have permission to update others contact.")
    } 
    

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
});



module.exports = {getContact , createContact , getContactUsingId , deleteContact , updateContact}


