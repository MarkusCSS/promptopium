import { Schema, model, models } from 'mongoose';

// Definišemo LikeSchema
const LikeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        required: [true, 'Comment is required'],
    },
}, { timestamps: true });

// Dodajemo jedinstveni indeks za kombinaciju user i comment
LikeSchema.index({ user: 1, comment: 1 }, { unique: true });

// Kreiramo i eksportujemo Like model
const Like = models.Like || model('Like', LikeSchema);

export default Like;
