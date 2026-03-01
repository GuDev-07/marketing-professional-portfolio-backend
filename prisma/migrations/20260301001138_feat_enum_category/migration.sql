-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProjectCategory" AS ENUM ('Branding & Identidade', 'Tráfego Pago', 'Gestão de Redes Sociais', 'CRM & Automação', 'Mídia Off');

-- CreateTable
CREATE TABLE "feedbacks" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT,
    "comment" TEXT,
    "avatar" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "ProjectCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "client" TEXT,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_experiences" (
    "id" BIGSERIAL NOT NULL,
    "start_year" INTEGER NOT NULL,
    "end_year" INTEGER,
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_gallery" (
    "id" BIGSERIAL NOT NULL,
    "experience_id" BIGINT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "timeline_gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedbacks_name_key" ON "feedbacks"("name");

-- AddForeignKey
ALTER TABLE "timeline_gallery" ADD CONSTRAINT "timeline_gallery_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "timeline_experiences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
