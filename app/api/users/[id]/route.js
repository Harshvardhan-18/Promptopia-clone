import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ username: user.username }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch user details" }), { status: 500 });
  }
};