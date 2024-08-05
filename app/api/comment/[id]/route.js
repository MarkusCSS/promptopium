import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

// GET metoda za dohvaćanje pojedinačnog komentara po ID-ju
export const GET = async (request, { params }) => {
    try {
        console.log('Connecting to DB...');
        await connectToDB();
        console.log('Fetching comment with ID:', params.id);

        const comment = await Comment.findById(params.id).populate("creator").populate("prompt");
        
        if (!comment) {
            console.log('Comment not found with ID:', params.id);
            return new Response("Comment Not Found", { status: 404 });
        }

        console.log('Comment found:', comment);
        return new Response(JSON.stringify(comment), { status: 200 });

    } catch (error) {
        console.error('Error in GET request:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

// PATCH metoda za ažuriranje pojedinačnog komentara po ID-ju
export const PATCH = async (request, { params }) => {
    const { text } = await request.json();

    try {
        await connectToDB();

        // Pronalaženje postojećeg komentara po ID-ju
        const existingComment = await Comment.findById(params.id);

        if (!existingComment) {
            return new Response("Comment not found", { status: 404 });
        }

        // Ažuriranje komentara sa novim podacima
        existingComment.text = text;

        await existingComment.save();

        return new Response("Successfully updated the Comment", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Comment", { status: 500 });
    }
};

// DELETE metoda za brisanje pojedinačnog komentara po ID-ju
export const DELETE = async (request, { params }) => {
    console.log('DELETE request received for ID:', params.id);

    try {
        await connectToDB();
        
        console.log('Database connected successfully');

        const result = await Comment.findByIdAndDelete(params.id);

        console.log('Delete result:', result);

        if (!result) {
            return new Response("Comment not found", { status: 404 });
        }

        return new Response("Comment deleted successfully", { status: 200 });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return new Response("Error deleting comment", { status: 500 });
    }
};
