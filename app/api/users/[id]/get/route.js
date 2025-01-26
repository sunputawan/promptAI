import User from "@/models/user"

export const GET = async (req, { params }) => {
    try {
        const user = await User.findById((await params).id);
        
        if(!user) {
            return new Response("User not found", {status: 404});
        }

        return new Response(JSON.stringify(user), {
            status: 200
        });
    } catch (error) {
        console.log((error));
        return new Response("Failed to fetch name", {
            status: 500
        })
    }
}