import { useRouter } from "next/navigation"
import { AlertCircleIcon, GlobeIcon, Loader2Icon } from "lucide-react"
interface ProjectsCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

import React from "react"
import { useProjects } from "../hooks/use-projects"
import { FaGithub } from "react-icons/fa"
import { cn } from "@/lib/utils"
import { Doc } from "../../../../convex/_generated/dataModel"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

const getProjectIcon = (project: Doc<"projects">) => {
  const iconClass = "size-4 text-muted-foreground"
  switch (project.importStatus) {
    case "completed":
      return <FaGithub className={iconClass} />
    case "failed":
      return <AlertCircleIcon className={iconClass} />
    case "importing":
      return <Loader2Icon className={cn(iconClass, "animate-spin")} />
    default:
      return <GlobeIcon className={iconClass} />
  }
}

const ProjectsCommandDialog = ({
  open,
  onOpenChange,
}: ProjectsCommandDialogProps) => {
  const router = useRouter()
  const projects = useProjects()

  const handleSelect = (projectId: string) => {
    router.push(`/projects/${projectId}`)
    onOpenChange(false)
  }
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search Projects"
      description="Search and navigate to your projects"
    >
      <CommandInput placeholder="Search Projects..." />
      <CommandList>
        <CommandEmpty>No projects found.</CommandEmpty>
        <CommandGroup heading="Projects">
          {projects?.map((project) => (
            <CommandItem
              key={project._id}
              value={`${project.name}-${project._id}`}
              onSelect={() => handleSelect(project._id)}
            >
              {getProjectIcon(project)}
              <span>{project.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export default ProjectsCommandDialog
