import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(request)=>{
    try {
        await connectToDB();
        const prompts = await Prompt.find({})
        .populate('creator') // Populacija kreatora prompta
       
        return new Response(JSON.stringify(prompts), {status:200,
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                'Surrogate-Control': 'no-store',
              },
        })
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response('Failed to fecth all prompts', {status:500})
    }
}


  