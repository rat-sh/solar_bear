"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

const X = () => {
  const projects = useQuery(api.project.get);
  const createProject = useMutation(api.project.create);

  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <Button onClick={() =>
        createProject({
          name: "Project 1"
        })}>
        Add new
      </Button>

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