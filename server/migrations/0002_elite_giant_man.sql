CREATE TABLE IF NOT EXISTS "emailVerificationToken" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "emailVerificationToken_id_token_pk" PRIMARY KEY("id","token")
);
