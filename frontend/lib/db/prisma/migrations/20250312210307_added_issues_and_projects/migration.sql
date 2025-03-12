-- CreateTable
CREATE TABLE "Project" (
    "projectID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "creatorId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ProjectLog" (
    "projectLogID" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "projectLogDate" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Issue" (
    "issueID" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Attachament" (
    "attachementID" SERIAL NOT NULL,
    "attachement" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentID" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "commentDate" TIMESTAMP(3) NOT NULL,
    "taskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "noteID" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "noteDate" TIMESTAMP(3) NOT NULL,
    "taskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "tagID" SERIAL NOT NULL,
    "tag" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Change" (
    "changeID" SERIAL NOT NULL,
    "changeDate" TIMESTAMP(3) NOT NULL,
    "changeInfo" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "UsersIssues" (
    "userId" TEXT NOT NULL,
    "issueId" INTEGER NOT NULL,

    CONSTRAINT "UsersIssues_pkey" PRIMARY KEY ("userId","issueId")
);

-- CreateTable
CREATE TABLE "ProjectsUsers" (
    "userId" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "ProjectsUsers_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_projectID_key" ON "Project"("projectID");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectLog_projectLogID_key" ON "ProjectLog"("projectLogID");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_issueID_key" ON "Issue"("issueID");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_name_key" ON "Issue"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Attachament_attachementID_key" ON "Attachament"("attachementID");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_commentID_key" ON "Comment"("commentID");

-- CreateIndex
CREATE UNIQUE INDEX "Note_noteID_key" ON "Note"("noteID");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_tagID_key" ON "Tag"("tagID");

-- CreateIndex
CREATE UNIQUE INDEX "Change_changeID_key" ON "Change"("changeID");

-- AddForeignKey
ALTER TABLE "ProjectLog" ADD CONSTRAINT "ProjectLog_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachament" ADD CONSTRAINT "Attachament_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Change" ADD CONSTRAINT "Change_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersIssues" ADD CONSTRAINT "UsersIssues_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersIssues" ADD CONSTRAINT "UsersIssues_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("issueID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsUsers" ADD CONSTRAINT "ProjectsUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsUsers" ADD CONSTRAINT "ProjectsUsers_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("projectID") ON DELETE RESTRICT ON UPDATE CASCADE;
