import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async ( req ) => {
    try {
        await connectToDB();

        const { userId, newName } = await req.json();
        
        const user = await User.findById(userId);
        user.username = newName.replace(" ", "").toLowerCase();

        await user.save();

        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch(error) {
        console.log(error);
        return new Response("Failed to update name", {
            status: 500
        })
    }
}