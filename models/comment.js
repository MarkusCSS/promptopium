import { Schema, model, models } from 'mongoose';

// Definišemo CommentSchema
const CommentSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Comment text is required'],
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator is required'],
    },
    prompt: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
        required: [true, 'Prompt is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
},{timestamps:true});

CommentSchema.index({ creator: 1 });
CommentSchema.index({ prompt: 1 });

// Kreiramo i eksportujemo Comment model
const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;
