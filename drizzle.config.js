import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./utils/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:"postgresql://attendence_owner:M0zW6GiVCkhJ@ep-royal-queen-a5wudecg.us-east-2.aws.neon.tech/attendence?sslmode=require",
  },
});
