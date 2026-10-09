"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const X = () => {
  const projects = useQuery(api.project.get);
  const createProject = useMutation(api.project.create);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProject = async () => {
    setIsPending(true);
    setError(null);
    try {
      await createProject({
        name: "Project 1",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Button disabled={isPending} onClick={handleCreateProject}>
        {isPending ? "Adding..." : "Add new"}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {projects?.map((project) => (
        <div key={project._id}>
          <h1>{project.name}</h1>
          <p>Owner Id: {project.ownerId}</p>
        </div>
      ))}
    </div>
  );
};

export default X;