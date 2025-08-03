import { RoadmapForm } from '../../_components/roadmap-form';

interface EditRoadmapPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRoadmapPage({
  params,
}: EditRoadmapPageProps) {
  const { id } = await params;
  return <RoadmapForm mode="edit" roadmapId={id} />;
}
