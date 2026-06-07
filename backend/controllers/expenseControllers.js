import mongoose from 'mongoose';
import Expense from '../models/Expense.js'


// Get all Exepenses
export const getExpenses = async (req, res) => {
    try {
        const {search, category} = req.query;
        let query = {userId: req.user._id};
        // let query = {};

        // if(search) {
        //     query.title = {$regex: search, $options: 'i'}
        // }

        if(search) {
            query.$or = [
                {title: {$regex: search, $options: 'i'} },
                {category: {$regex: search, $options: 'i'} },
                {description: {$regex: search, $options: 'i'} },
            ]
        }

        if(category) {
            query.category = category;
        }

        const expenses = await Expense.find(query).sort({date: -1});
        res.json({success: true, data: expenses});

    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

// Get Single Expense
export const getExpenseById = async (req, res) => {
    try{

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false, message: 'Invalid Expense ID'});
        }

        const expense = await Expense.findById(req.params.id);

        if(!expense){
            return res.status(404).json({success: false, message: 'Expense not found'});
        }
        res.json({success: true, data: expense});

    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

// Create Expense
export const createExpense = async (req, res) => {
    try{

        const {title, amount, category, date, description} = req.body;

        const expense = await Expense.create({userId: req.user._id, title, amount, category, date, description});

        res.status(201).json({success: true, data: expense});

    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

// Update Expense
export const updateExpense = async (req, res) => {
    try{

         if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false, message: 'Invalid Expense ID'});
        }

        const expense = await Expense.findOneAndUpdate(
            {_id: req.params.id, userId: req.user._id},
            req.body,
            {new: true, runValidators: true}
        );

        if(!expense){
            return res.status(404).json({success: false, message: 'Expense not found'});
        }

        res.json({success: true, data: expense});

    } catch(error){
        res.status(500).json({success: false, message: error.message});
    }
};

// Delete Expense
export const deleteExpense = async (req, res) => {
    try{

         if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(400).json({success: false, message: 'Invalid Expense ID'});
        }

        const expense = await Expense.findByIdAndDelete({_id: req.params.id, userId: req.user._id});

        if(!expense) {
            return res.status(404).json({success: false, message: 'Expense not found'});
        }

        res.json({success: true, message: 'Expense deleted successfully'});
    } catch(error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// Get Dashboard stats
export const getDashboardStats = async (req, res) => {
    try{

        const userId = req.user._id;

        const now = new Date();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const totalExpenses = await Expense.aggregate([
            {$match: {userId}},
            { $group: {_id: null, total: {$sum: '$amount'} } }
        ]);

        const monthlyExpenses = await Expense.aggregate([
            {$match: {userId, date: {$gte: startOfMonth} } },
            // {$group: {_id: '$category', total: {$sum: '$amount'} } }
            {$group: {_id: null, total: {$sum: '$amount'} } }
        ]);

        const recentTransactions = await Expense.find({userId})
        .sort({date: -1})
        .limit(5);

        const categoryWise = await Expense.aggregate([
            {$match: {userId}},
            {$group: {_id: '$category', total: {$sum: '$amount'} } },
            {$sort: { total: -1 } }
        ]);

        const totalCount = await Expense.countDocuments({ userId });

        const monthlyTrend = await Expense.aggregate([
            {$match: {userId}},
            {
                $group: {
                    _id: {
                        year: {$year: '$date'},
                        month: {$month: '$date'}
                    },
                    total: {$sum: '$amount'}
                }
            },
            {$sort: {'_id.year': 1, '_id.month': 1}},
            {$limit: 6}
        ]);

        res.json({
            success: true,
            data: {
                totalExpenses: totalExpenses[0]?.total || 0,
                monthlyExpenses: monthlyExpenses[0]?.total || 0,
                recentTransactions,
                categoryWise,
                topCategory: categoryWise[0] || null,
                monthlyTrend,
                totalCount,
            }
        });

    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
};