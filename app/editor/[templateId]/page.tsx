import { notFound } from "next/navigation";
import Editor from "../../components/Editor";
import { TEMPLATE_LIBRARY, TemplateId } from "../../components/templates/templateRegistry";

export default async function TemplateEditorPage({
    params,
}: {
    params: Promise<{ templateId: string }> | { templateId: string };
}) {
    const { templateId } = await params;
    const isKnownTemplate = TEMPLATE_LIBRARY.some((template) => template.id === templateId);

    if (!isKnownTemplate) {
        notFound();
    }

    return <Editor templateId={templateId as TemplateId} backHref="/template-gallery" />;
}
