import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteinvite = mutation({
    args: { 
        _id: v.optional(v.id('addtoteam')),
    },
    handler: async (ctx, args) => {
        if (!args._id) {
            throw new Error('Missing required field: _id');
        }
        await ctx.db.delete(args._id);
    },
});
