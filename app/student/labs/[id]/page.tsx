import { LabViewer } from "@/components/student/lab-viewer"

interface LabPageProps {
  params: {
    id: string
  }
}

export default function LabPage({ params }: LabPageProps) {
  return <LabViewer labId={params.id} />
}
