import MyDocuments from '@/pages/my-documents'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_main/my-documents')({
  component: MyDocuments,
})
