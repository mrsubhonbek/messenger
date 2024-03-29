import prisma from "~/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.email) return null;

    const conversation = await prisma.converasation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        user: true,
      },
    });

    return conversation;
  } catch (e) {
    return null;
  }
};

export default getConversationById;
