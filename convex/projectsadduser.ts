import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const appenduser = mutation({
    args: {
        _id: v.string(),
        otherusers: v.string(), // The user to be appended to the array
    },
    handler: async (ctx, { _id, otherusers }) => {
        // Fetch the project document
        const project = await ctx.db.get(_id);

        if (!project) {
            throw new Error(`Project with id ${_id} not found`);
        }

        // Append the new user to the otherusers array
        const updatedOtherUsers = [...project.otherusers, otherusers];

        // Update the project document with the new otherusers array
        await ctx.db.patch(_id, {
            otherusers: updatedOtherUsers,
        });

        return updatedOtherUsers;
    },
});