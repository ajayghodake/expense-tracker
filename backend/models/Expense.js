import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, 

    title: {
        type: String,
        required : [true, 'Title is Required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters'],
    }, 

    amount: {
        type: Number,
        required : [true, 'Amount is Required'],
        min: [1, 'Amount must be greater than 0'],
    }, 

    category: {
        type: String,
        required : [true, 'Category is Required'],
        enum: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 'Education', 'Bills', 'Other'],
    }, 

    date: {
        type: Date,
        required: [true, 'Date is required'],
        default: Date.now,
    }, 

    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description too long'],
        default: '',
    },
}, {timestamps: true});

export default mongoose.model('Expense', expenseSchema);