import { connectToDB } from "@utils/database";
import Comment from "@models/comment";

export const GET = async (request) => {
    try {
        await connectToDB();
        const comments = await Comment.find({})
            .populate('creator') // Popunjava podatke o korisniku koji je kreirao komentar
            .populate('prompt'); // Popunjava podatke o promptu na koji je komentar postavljen

        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return new Response('Failed to fetch all comments', { status: 500 });
    }
};
