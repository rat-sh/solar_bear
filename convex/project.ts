import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticated");
        }
        const projectId = await ctx.db.insert("project", {
            name: args.name,
            ownerId: identity.subject,
        });

        return projectId;
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return [];
        }

        return await ctx.db
            .query("project")
            .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
            .collect();
    },
})