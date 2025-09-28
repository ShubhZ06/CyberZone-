import { ModuleViewer } from "@/components/student/module-viewer"

interface ModulePageProps {
  params: {
    id: string
  }
}

export default function ModulePage({ params }: ModulePageProps) {
  return <ModuleViewer moduleId={params.id} />
}
