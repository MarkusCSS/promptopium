import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        console.log('Connecting to DB...');
        await connectToDB();
        console.log('Fetching prompt with ID:', params.id);

        const prompt = await Prompt.findById(params.id).populate("creator").populate("comments");
        
        if (!prompt) {
            console.log('Prompt not found with ID:', params.id);
            return new Response("Prompt Not Found", { status: 404 });
        }

        console.log('Prompt found:', prompt);
        return new Response(JSON.stringify(prompt), { status: 200 });

    } catch (error) {
        console.error('Error in GET request:', error); // Log the error details
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Successfully updated the Prompts", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    console.log('DELETE request received for ID:', params.id); // Log the ID

    try {
        await connectToDB();
        
        console.log('Database connected successfully');

        const result = await Prompt.findByIdAndDelete(params.id);

        console.log('Delete result:', result);

        if (!result) {
            return new Response("Prompt not found", { status: 404 });
        }

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.error('Error deleting prompt:', error); // Log the error
        return new Response("Error deleting prompt", { status: 500 });
    }
};
