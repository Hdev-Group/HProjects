import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addjobtitle = mutation({
    args: {
        projectID: v.string(),
        userid: v.string(),
        jobtitle: v.string(),
    },
    handler: async (ctx, { userid, jobtitle, projectID }) => {

        // Check if the user exists by searching for the userid
        const existingUser = await ctx.db.query("users").filter(q => q.eq(q.field("userid"), userid)).first();

        if (existingUser) {
            // If the user exists, update their job title using the unique _id
            await ctx.db.patch(existingUser._id, { jobtitle });
            return { ...existingUser, jobtitle };
        } else {
            // If the user does not exist, create a new record
            const newUser = {
                userid,
                jobtitle,
                projectID,
            };
            const insertedUser = await ctx.db.insert("users", newUser);
            return insertedUser;
        }
    },
});
