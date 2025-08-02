import { RoadmapForm } from "../../_components/roadmap-form";

interface EditRoadmapPageProps {
  params: {
    id: string;
  };
}

export default function EditRoadmapPage({ params }: EditRoadmapPageProps) {
  return <RoadmapForm mode="edit" roadmapId={params.id} />;
}
