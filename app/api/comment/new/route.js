import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const POST = async (req) => {
    const { userId, promptId, text } = await req.json();

    try {
        await connectToDB();
        const newComment = new Comment({
            creator: userId,
            prompt: promptId,
            text,
        });
        await newComment.save();
        return new Response(JSON.stringify(newComment), { status: 201 });
    } catch (error) {
        return new Response('Failed to create a new comment', { status: 500 });
    }
};
