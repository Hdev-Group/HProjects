import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteIncident = mutation({
    args: {
        _id: v.optional(v.id('incidents')),
    },
    handler: async (ctx, args) => {
        if (!args._id) {
            throw new Error('Missing required field: _id');
        }
        await ctx.db.delete(args._id);

        const incidentlogs = await ctx.db.query('incidentlogs')
            .filter(q => q.eq(q.field('incidentid'), args._id))
            .collect();

        for (const incidentlog of incidentlogs) {
            await ctx.db.delete(incidentlog._id);
        }
    },
});