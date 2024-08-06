import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deletePager = mutation({
    args: { 
        _id: v.optional(v.id('pager')),
    },
    handler: async (ctx, args) => {
        if (!args._id) {
            throw new Error('Missing required field: _id'); // Update the error message to use "_id"
        }
        await ctx.db.delete(args._id);
    },
});
