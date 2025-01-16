import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    useerName: v.string(),
    email: v.string(),
    imageURL: v.string(),
  }),
});
